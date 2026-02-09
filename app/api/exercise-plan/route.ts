import { NextResponse } from "next/server";
import { getExercisePlanData } from "@/backend/overview/service";
import { createClient } from "@/backend/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const planId = searchParams.get("planId");

    // if (!planId) {
    //   return NextResponse.json({ error: "Plan ID required" }, { status: 400 });
    // }

    const data = await getExercisePlanData("EP-2026-SK34-002");

    if (!data) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching plan:", err);
    return NextResponse.json({ error: "Failed to load plan" }, { status: 500 });
  }
}
