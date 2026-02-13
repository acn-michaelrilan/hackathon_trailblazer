// import { createClient } from "@/backend/server";

// export async function insertFunctionalAbility() {
//   // Create Supabase client
//   const supabase = await createClient();

//   // Data to insert
//   const payload = {
//     user_id: 100,
//     range_of_motion: "Sample Value",
//   };

//   console.log("📤 Inserting Functional Ability:", payload);

//   // Insert into database
//   const { data, error } = await supabase
//     .from("functional_ability")
//     .insert(payload)
//     .select(); // returns inserted row(s)

//   // Error handling
//   if (error) {
//     console.error("❌ Supabase Insert Error:", error.message);
//     return null;
//   }

//   // Success log
//   console.log("✅ Insert Success:", data);

//   return data;
// }

"use server";

import { createClient } from "@/backend/server";

export async function insertFunctionalAbility(name: string) {
  try {
    const supabase = await createClient();

    // 🔹 Dynamic payload
    const payload = {
      name: name,
    };

    console.log("📤 Inserting Test Data:", payload);

    const { data, error } = await supabase
      .from("testing_table")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase Insert Error:", error.message);
      return { success: false, error: error.message };
    }

    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    console.error("❌ Unexpected Error:", err);
    return { success: false, error: "Unexpected server error" };
  }
}
