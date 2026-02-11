import { NextResponse } from "next/server";
import { createClient } from "@/backend/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    // Verify user is authenticated
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { sessionExerciseId } = await request.json();

    // Validate inputs
    if (!sessionExerciseId) {
      return NextResponse.json(
        { error: "Session exercise ID is required" },
        { status: 400 },
      );
    }

    // Update exercise status
    const { data, error } = await supabase.rpc("complete_session_exercise", {
      p_session_exercise_id: sessionExerciseId,
    });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error updating progress:", err);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 },
    );
  }
}
