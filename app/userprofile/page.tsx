import { createClient } from "@/backend/server";
import { redirect } from "next/navigation";
import UserProfileForm from "./userprofileform";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: account } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", user.id)
    .single();
    
// Server action to update full name 
  async function updateFullName(fullName: string) {
    "use server";

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { error } = await supabase
      .from("accounts")
      .update({
        full_name: fullName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  return (
    <UserProfileForm
      account={account}
      userEmail={user.email}
      updateFullName={updateFullName}
    />
  );
}
