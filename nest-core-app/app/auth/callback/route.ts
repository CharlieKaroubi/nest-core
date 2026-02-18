import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    // If there's no user, redirect to the landing page
    return NextResponse.redirect(`${origin}/landing-page`);
  }

  // If user is authenticated, check their household membership and redirect accordingly
  const { data, error } = await supabase
    .from("household_members")
    .select("id, household_id")
    .eq("user_id", user.data.user.id);

  if (error) {
    console.error("Error checking household membership:", error);
    // In case of an error, redirect to the landing page for now
    return NextResponse.redirect(`${origin}/landing-page`);
  } else {
    if (data.length === 0) {
      // If user is not part of any household, redirect to the households page
      return NextResponse.redirect(`${origin}/join-household`);
    }
  }

  const householdId = data![0].household_id;

  // If user is authenticated and part of a household, redirect to the home page
  return NextResponse.redirect(`${origin}/household/${householdId}`);
}
