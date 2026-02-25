import { exerciseService } from "@/backend/llm/service";
import { insertInformationInput } from "@/backend/informationinput/service";
import { createClient } from "@/backend/server";
import { NextResponse } from "next/server";
import { backupPlan } from "@/lib/defaultData";
import { ExercisePlanOutput, ExercisePlanWithProgress } from "@/ai/schema";

const addProfileAndProgress = (
  plan: ExercisePlanOutput,
  userId: string,
): ExercisePlanWithProgress => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  return {
    profile: { user_id: userId },
    ...plan,
    progress: {
      total_sessions: 0,
      completed_sessions: 0,
      completion_percent: 0,
      current_week: 1,
      current_day: 1,
      next_session_date: formattedDate,
    },
  };
};

export async function POST(request: Request) {
  let userId: string | null = null;
  // 1. Authenticate User (Securely get ID from Supabase)
  const supabase = await createClient();
  try {
    const { data } = await request.json();
    if (!data) {
      return NextResponse.json(
        { error: "Missing input data." },
        { status: 400 },
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    userId = user.id;

    // 2. Insert into DB first
    const insertResult = await insertInformationInput(data, userId);
    if (!insertResult.success) {
      console.error("❌ Database insertion failed:", insertResult.error);
      return NextResponse.json(
        { error: "Failed to save user profile. Plan generation aborted." },
        { status: 500 },
      );
    }

    console.log(
      "✅ Data inserted successfully. Proceeding to generate plan...",
    );

    // 3. Call generatePlan with Retry Logic (3 attempts)
    let plan = null;
    let attempts = 0;
    const MAX_RETRIES = 1;

    while (attempts < MAX_RETRIES) {
      try {
        attempts++;
        console.log(
          `🌀 Generating plan (Attempt ${attempts}/${MAX_RETRIES})...`,
        );
        plan = await exerciseService.generatePlan(data);
        if (plan) break;
      } catch (err) {
        console.error(
          `⚠️ Attempt ${attempts} failed:`,
          err instanceof Error ? err.message : err,
        );
        if (attempts >= MAX_RETRIES) {
          throw new Error(
            "All 3 attempts to generate the exercise plan failed.",
          );
        }
        await new Promise((res) => setTimeout(res, 1000));
      }
    }

    // 4. Return the generated plan
    console.log("✅ Plan generated successfully after", attempts, "attempts.");

    if (!plan) {
      throw new Error("Failed to generate exercise plan.");
    }

    // 5. Upsert generated plan for the user
    const planWithProgress = addProfileAndProgress(plan, userId);

    const { error: upsertError } = await supabase.rpc(
      "upsert_user_exercise_data",
      { payload: planWithProgress },
    );

    if (upsertError) {
      console.error("❌ Plan upsert failed:", upsertError);
      return NextResponse.json(
        { error: "Failed to save generated plan." },
        { status: 500 },
      );
    }

    return NextResponse.json(planWithProgress, { status: 200 });
  } catch (error) {
    console.error("❌ Critical error:", error);

    if (!userId) {
      return NextResponse.json(
        { error: "Unable to process request. User ID missing." },
        { status: 401 },
      );
    }

    const backupPlanWithProgress = addProfileAndProgress(backupPlan, userId);

    const { error: backupUpsertError } = await supabase.rpc(
      "upsert_user_exercise_data",
      { payload: backupPlanWithProgress },
    );

    if (backupUpsertError) {
      console.error("❌ Backup plan upsert failed:", backupUpsertError);
      return NextResponse.json(
        { error: "Failed to save backup plan." },
        { status: 500 },
      );
    }

    return NextResponse.json(backupPlanWithProgress, { status: 200 });
  }
}
