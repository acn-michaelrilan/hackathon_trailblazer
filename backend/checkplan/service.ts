import { createClient } from "@/backend/server";

export async function getUserExercisePlan(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("exercise_plans")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) console.error("Error fetching exercise plan data:", error);
  return data ?? null;
}