import { GoogleSignInButton } from "@/components/google-sign-in";
import Image from "next/image";

import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Image
        src="/nest-core.png"
        alt="NestCore Logo"
        width={200}
        height={200}
      />
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className={`text-8xl ${pacifico.className}`}>NestCore</h1>
        <GoogleSignInButton />
      </div>
    </div>
  );
}
