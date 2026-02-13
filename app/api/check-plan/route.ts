import { NextResponse } from "next/server";
import { createClient } from "@/backend/server";
import { getUserExercisePlan } from "@/backend/checkplan/service";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json({ error: "user_id is required" }, { status: 400 });
    }

    // ✅ Prevent checking other people’s plans
    if (userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const exercisePlan = await getUserExercisePlan(userId);

    if (!exercisePlan) {
      return NextResponse.json(
        { error: "Exercise plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(exercisePlan);
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}