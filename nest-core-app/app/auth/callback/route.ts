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
    // If there's no user, redirect to the login page
    return NextResponse.redirect(`${origin}/login`);
  }

  // If user is authenticated, check their household membership and redirect accordingly
  const { data, error } = await supabase
    .from("household_members")
    .select("id")
    .eq("user_id", user.data.user.id);

  if (error) {
    console.error("Error checking household membership:", error);
  } else {
    if (data.length === 0) {
      // If user is not part of any household, redirect to the households page
      return NextResponse.redirect(`${origin}/join-household`);
    }
  }

  // If user is authenticated and part of a household, redirect to the home page
  return NextResponse.redirect(`${origin}/home`);
}
