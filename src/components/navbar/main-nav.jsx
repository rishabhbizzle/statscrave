"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { useComparison } from "@/context/ComparisonProvider";

export function MainNav() {
  const pathname = usePathname();
  const { comparisonList = [] } = useComparison();


  return (
    <div className="mr-4 hidden lg:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <img
          src="/logo-white.png"
          alt="Logo"
          width="40"
          height="40"
          className="rounded-full invert-white dark:invert-0"
        />
        <span className="hidden font-bold sm:inline-block text-xl">
          StatsCrave
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Dashboard
        </Link>
        {/* <Link
          href="/userSpotify"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/userSpotify" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Your Spotify
        </Link> */}
        <Link
          href="/records"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/records")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Records
        </Link>
        <Link
          href="/charts"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/charts")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Charts
        </Link>
        <Link
          href="/replay"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/replay")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Replay
        </Link>
        <Link
          href="/updates"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/updates")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Updates
        </Link>
        <Link
          href="/compare"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/compare" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Compare

          {comparisonList.length > 0 && (
            <span className="relative ml-4">
              <span className="absolute top-0  right-0 -mt-1 -mr-1 bg-primary font-medium rounded-full h-4 w-4 flex items-center justify-center">
                {comparisonList.length}
              </span>
            </span>
          )}
        </Link>
      </nav>
    </div>
  );
}
