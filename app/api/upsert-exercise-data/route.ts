// app/api/upsert-plan/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/backend/server";
import { INPUT_MOCK_DATA } from "@/lib/mockData";

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    if (!data) {
      return NextResponse.json(
        { error: "Missing input data." },
        { status: 400 },
      );
    }
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
    // Call your Postgres function (RPC)
    const { error } = await supabase.rpc("upsert_user_exercise_data", {
      data,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message, details: error },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
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
