import { exerciseService } from "@/backend/llm/service";
import { insertInformationInput } from "@/backend/informationinput/service";
import { createClient } from "@/backend/server";
import { NextResponse } from "next/server";
import { INPUT_MOCK_DATA, INPUT_MOCK_DATA_2 } from "@/lib/mockData";
import { json } from "zod/v4/mini";

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    if (!data) {
      return NextResponse.json(
        { error: "Missing input data." },
        { status: 400 },
      );
    }

    // 1. Authenticate User (Securely get ID from Supabase)
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Use the ID from the secure auth session directly
    const userId = user.id;

    console.log("👤 Authenticated user ID:", userId);
    console.log("📥 Received data for plan generation:", data);
    console.log("📥 Received Mock data for plan generation:", INPUT_MOCK_DATA);
    // 2. Insert into DB first
    // This ensures data is saved before we spend tokens/time on AI generation
    const insertResult = await insertInformationInput(INPUT_MOCK_DATA, userId);

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
    const MAX_RETRIES = 3;

    while (attempts < MAX_RETRIES) {
      try {
        attempts++;
        console.log(
          `🌀 Generating plan (Attempt ${attempts}/${MAX_RETRIES})...`,
        );

        plan = await exerciseService.generatePlan(INPUT_MOCK_DATA_2);

        // If successful, break the loop
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

        // Delay 1 second before retrying to handle transient issues
        await new Promise((res) => setTimeout(res, 1000));
      }
    }

    // 4. Return the generated plan
    console.log("✅ Plan generated successfully after", attempts, "attempts.");

    if (!plan) {
      throw new Error("Failed to generate exercise plan.");
    }

    // get current date for next session scheduling
    const currentDate = new Date();
    // format as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split("T")[0];
    // Adding user profile info to the plan response
    plan.profile = {
      user_id: userId
    }

    plan.progress = {
      total_sesssions: 0,
      completed_sessions: 0,
      completion_percent: 0,
      current_week: 0,
      current_day: 0,
      next_session_date: formattedDate
    }

    const planString = JSON.stringify(plan, null, 2);
    console.log("Generated Plan:", planString);
    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    console.error("❌ Critical error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process request",
      },
      { status: 500 },
    );
  }
}
