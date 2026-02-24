import { NextResponse } from "next/server";
import { getExercisePlanData } from "@/backend/overview/service";
import { createClient } from "@/backend/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { data: plan, error: planError } = await supabase
      .from("exercise_plans")
      .select("plan_id")
      .eq("user_id", user?.id)
      .single();

    if (planError || !plan) {
      return NextResponse.json(
        { error: "Exercise plan not found for user" },
        { status: 404 },
      );
    }
    const planId = plan.plan_id;
    console.log("found plan id", planId);

    const data = await getExercisePlanData(planId);

    if (!data) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching plan:", err);
    return NextResponse.json({ error: "Failed to load plan" }, { status: 500 });
  }
}
