import { GoogleSignInButton } from "@/components/google-sign-in";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-8xl text-blue-900 font-pacifico">NestCore</h1>
      <GoogleSignInButton />
    </div>
  );
}
