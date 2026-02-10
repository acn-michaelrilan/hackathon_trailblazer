import { createClient } from "@/backend/server";

export async function getUserSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}