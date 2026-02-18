"use client";

import Image from "next/image";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  created_at: string;
}

export default function NavBar() {
  const user = useCurrentUser();

  return (
    <nav className="bg-gray-100 shadow-md flex items-center h-16">
      {user && (
        <>
          <Image
            src={user.avatar_url}
            alt="User Avatar"
            width={30}
            height={30}
            className="w-10 h-10 rounded-full m-2"
          />
          <h1 className="text-xl font-bold text-blue-900">{user.name}</h1>
        </>
      )}
    </nav>
  );
}
