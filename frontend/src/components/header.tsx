"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return ( <>
    {/* Mobile TopBar */}
    <header className="fixed top-0 left-0 right-0 h-14 bg-fileshare-dark text-white flex items-center justify-between px-4 md:hidden z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <svg width="32" height="20" viewBox="0 0 40 24" className="fill-white">
          <path d="M16.41 8.53a1.009 1.009 0 00-1.383-.386c-.513.292-.693.956-.401 1.47l8.272 14.624a1.009 1.009 0 001.383.386c.513-.292.693-.956.401-1.47L16.41 8.53zm-5.263-.134a1.009 1.009 0 011.383.386l8.272 14.625c.292.513.112 1.177-.401 1.47a1.009 1.009 0 01-1.383-.387L10.746 9.866c-.292-.513-.112-1.177.401-1.47z"></path>
          <path d="M24.715 0a12.92 12.92 0 100 25.842 12.92 12.92 0 000-25.842zm0 2.013c6.02 0 10.906 4.886 10.906 10.907 0 6.021-4.886 10.907-10.906 10.907-6.022 0-10.907-4.886-10.907-10.907 0-6.021 4.885-10.907 10.907-10.907z"></path>
        </svg>
      </Link>

      {/* Buttons */}
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button variant="ghost" className="text-white hover:bg-white/10 px-3 py-1">
          Log in
        </Button>
        <Button className="bg-white text-fileshare-dark hover:bg-gray-200 px-3 py-1">
          Sign up
        </Button>
      </div>
    </header>

    {/* Desktop Sidebar */}
    <header
      className="
        fixed top-0 left-0 h-screen w-24 z-50 bg-fileshare-dark text-white dark:bg-fileshare-dark py-6
        hidden md:flex flex-col justify-between
      "
    >
      <div className="flex flex-col items-center justify-between h-full px-2">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-8">
          <svg width="40" height="24" viewBox="0 0 40 24" className="fill-white">
            <path d="M16.41 8.53a1.009 1.009 0 00-1.383-.386c-.513.292-.693.956-.401 1.47l8.272 14.624a1.009 1.009 0 001.383.386c.513-.292.693-.956.401-1.47L16.41 8.53zm-5.263-.134a1.009 1.009 0 011.383.386l8.272 14.625c.292.513.112 1.177-.401 1.47a1.009 1.009 0 01-1.383-.387L10.746 9.866c-.292-.513-.112-1.177.401-1.47z"></path>
            <path d="M24.715 0a12.92 12.92 0 100 25.842 12.92 12.92 0 000-25.842zm0 2.013c6.02 0 10.906 4.886 10.906 10.907 0 6.021-4.886 10.907-10.906 10.907-6.022 0-10.907-4.886-10.907-10.907 0-6.021 4.885-10.907 10.907-10.907z"></path>
          </svg>
        </Link>

        {/* Auth Buttons & Theme Toggle */}
        <div className="flex flex-col items-center space-y-4">
          <ThemeToggle />
          <Button variant="ghost" className="text-white hover:bg-white/10 w-20">
            Log in
          </Button>
          <Button className="bg-white text-fileshare-dark hover:bg-gray-200 w-20">
            Sign up
          </Button>
        </div>
      </div>
    </header> </>
  );
}
