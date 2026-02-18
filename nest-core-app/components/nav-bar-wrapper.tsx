"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/nav-bar";

export default function NavBarWrapper() {
  const pathname = usePathname();
  const showNavBar = pathname !== "/landing-page";

  return showNavBar ? <NavBar /> : null;
}
