"use client";

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export function GoogleSignInButton() {
  const supabase = createClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("OAuth error:", error.message);
    }
  };

  return (
    <div className="mt-8 flex items-center gap-3">
      <button
        onClick={handleSignIn}
        className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-3 mb:4 text-gray-800 shadow hover:transform hover:scale-[1.03] transition-transform duration-100"
        aria-label="Sign in with rice.edu"
      >
        <Image
          src="/landing-page-google-logo.svg"
          alt="Google Logo"
          width={24}
          height={24}
          className="w-4 h-4 md:w-5 md:h-5 shrink-0"
        />
        Sign in with Google
      </button>
    </div>
  );
}
