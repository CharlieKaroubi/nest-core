"use client";

import { createClient } from "@/lib/supabase/client";

export default function GoogleSignInButton() {
  const supabase = createClient();

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    if (error) console.error(error);
  };

  return (
    <button onClick={signInWithGoogle}>
      Continue with Google
    </button>
  );
}
