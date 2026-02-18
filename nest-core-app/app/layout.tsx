import type { Metadata } from "next";
import { Poppins, Pacifico } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import NavBarWrapper from "@/components/nav-bar-wrapper";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
});

export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased bg-gray-200 text-blue-900 ${pacifico.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBarWrapper />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
