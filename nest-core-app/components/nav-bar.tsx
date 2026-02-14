import Image from "next/image";

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  created_at: string;
}

export default function NavBar({ user }: { user: User | null }) {
  return (
    <nav className="bg-gray-100 shadow-md flex items-center">
      <Image
        src={user?.avatar_url || "/default-avatar.png"}
        alt="User Avatar"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full m-2"
      />
      <h1 className="text-xl font-bold text-blue-900">
        {user?.name || "Guest"}
      </h1>
    </nav>
  );
}
