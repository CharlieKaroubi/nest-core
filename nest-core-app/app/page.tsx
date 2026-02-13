import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default async function Root() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  } else {
    redirect("/landing-page");
  }
}
