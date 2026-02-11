"use server";

import { createClient } from "@/backend/server";

export async function signUpUser(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup error:", error.message);
    return { error: error.message };
  }

  return { success: true };
}

export async function loginUser(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
export async function logoutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}