"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  created_at: string;
}

export function useCurrentUser() {
  const supabase = createClient();
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id);

        if (error) {
          console.error("Error fetching user data:", error);
          return;
        }
        setUserData(data[0]);
      } else {
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  return userData;
}
