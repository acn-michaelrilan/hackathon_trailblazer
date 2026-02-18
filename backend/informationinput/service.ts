"use server";

import { createClient } from "@/backend/server";
import { InformationInputData } from "@/types";

/**
 * Best Practice: Using a single RPC call to handle multi-table insertion.
 * This ensures atomicity (all or nothing) and reduces network latency.
 */
export async function insertInformationInput(
  userData: InformationInputData,
  userId: string,
) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.rpc("insert_informationinput_data", {
      p_user_id: userId,
      p_user_data: userData,
    });

    if (error) throw error;

    return { success: true };
  } catch (err) {
    console.error("❌ Database Operation Failed:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Internal Server Error",
    };
  }
}
