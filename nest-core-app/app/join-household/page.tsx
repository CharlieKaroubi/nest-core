import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import JoinHouseholdClient from "./join-household-client";

export default async function JoinHouseholdPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data } = await supabase
      .from("household_members")
      .select("household_id")
      .eq("user_id", user.id)
      .single();

    if (data) {
      redirect(`/household/${data.household_id}`);
    }
  }

  return <JoinHouseholdClient />;
}
