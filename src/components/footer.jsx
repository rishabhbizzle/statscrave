"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  CommandIcon,
  Github,
  KeyboardIcon,
  LayoutGridIcon,
  MoonIcon,
  TriangleIcon,
  Twitter,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/toggleButton";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-col gap-5">
          <div className="flex space-x-6">
            <TriangleIcon className="h-5 w-5 " />
            <p className="text-sm ">© 2024</p>
            <Badge variant="secondary">All systems normal.</Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm transition-colors hover:text-foreground/80",
                  pathname === "/dashboard"
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                Dashboard
              </Link>
              {/* <Link
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
        </Link> */}
              <Link
                href="/records"
                className={cn(
                  "text-sm transition-colors hover:text-foreground/80",
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
                  "text-sm transition-colors hover:text-foreground/80",
                  pathname?.startsWith("/charts")
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                Charts
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
              href='/'
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  "w-9 px-0"
                )}
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href='/'
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  "w-9 px-0"
                )}
              >
                <Twitter className=" h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
