"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.png";
import Image from "next/image";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          src={Logo}
          alt="Logo"
          width="40"
          height="40"
          className="rounded-full"
        />
        <span className="hidden font-bold sm:inline-block">StatsForFans</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/artist"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/artist" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Artists
        </Link>
        <Link
          href="/album"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/album")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Albums
        </Link>
        <Link
          href="/song"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/song")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Songs
        </Link>
        <Link
          href="/top-list"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/top-list")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Top List
        </Link>
      </nav>
    </div>
  );
}