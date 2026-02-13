// import { createClient } from "@/backend/server";
// import { redirect } from "next/navigation";
// import UserProfileForm from "./userprofileform";

// export default async function Page() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     redirect("/login");
//   }

//   const { data: account } = await supabase
//     .from("accounts")
//     .select("*")
//     .eq("id", user.id)
//     .single();
    
// // Server action to update full name 
//   async function updateFullName(fullName: string) {
//     "use server";

//     const supabase = await createClient();

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       redirect("/login");
//     }

//     const { error } = await supabase
//       .from("accounts")
//       .update({
//         full_name: fullName,
//         updated_at: new Date().toISOString(),
//       })
//       .eq("id", user.id);

//     if (error) {
//       throw new Error(error.message);
//     }
//   }

//   return (
//     <UserProfileForm
//       account={account}
//       userEmail={user.email}
//       updateFullName={updateFullName}
//     />
//   );
// }

import { createClient } from "@/backend/server";
import { redirect } from "next/navigation";
import UserProfileForm from "./userprofileform";

// prevents caching / stale server render in App Router
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Account {
  id: string;
  full_name: string;
  member_since: string;
  account_status: string;
  updated_at: string;
}

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: account } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", user.id)
    .single<Account>();

  // ✅ Use maybeSingle so “no rows” doesn’t behave like a hard error
  const { data: exercisePlan } = await supabase
    .from("exercise_plans")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  const hasExercisePlan = Boolean(exercisePlan?.id);

  async function updateFullName(fullName: string) {
    "use server";

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    // ✅ Existence check that is robust even if there are multiple rows
    const { count, error: countError } = await supabase
      .from("exercise_plans")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (countError) {
      console.error("exercise_plans countError:", countError);
      throw new Error(`Exercise plan check failed: ${countError.message}`);
    }

    if (!count || count < 1) {
      throw new Error("You cannot update profile without an exercise plan.");
    }

    const { error } = await supabase
      .from("accounts")
      .update({
        full_name: fullName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) throw new Error(error.message);
  }


  return (
    <UserProfileForm
      account={account!}
      userEmail={user.email}
      updateFullName={updateFullName}
      hasExercisePlan={hasExercisePlan}
      userId={user.id} // ✅ pass userId so client can re-check via API
    />
  );
}