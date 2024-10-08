"use client";

import Link from "next/link";
import {
  CommandIcon,
  Github,
  Instagram,
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
    <footer className="border-t border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-col gap-5">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
            <div className="flex justify-center items-center space-x-6">
              <p className="text-muted-foreground">StatsCrave</p>
              <p className="text-sm ">© 2024</p>
              <Badge variant="secondary">BETA</Badge>
            </div>
            <div className="flex items-center space-x-4">
              {/* <Link href="/" target="_blank" rel="noreferrer">
                <div className={cn("w-9 px-0")}>
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link> */}
              <Link href='https://instagram.com/statscravee' target="_blank" rel="noreferrer">
                <div className={cn("w-9 px-0")}>
                  <Instagram className=" h-5 w-5 " />
                  <span className="sr-only">Insta</span>
                </div>
              </Link>
              <Link href='https://twitter.com/statscrave' target="_blank" rel="noreferrer">
                <div className={cn("w-9 px-0")}>
                  <Twitter className=" h-5 w-5 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
              <ModeToggle />
            </div>
          </div>
          <div className="flex flex-col-reverse justify-col items-center">
            <div className="flex flex-col gap-2">
              <div className="flex space-x-6 text-muted-foreground text-sm text-center">
                *We are not related to Spotify, Billboard, etc. or any of the platform data we display.
                This is a fan project. The data shown on this website is
                publicly available and retrieved directly from APIs.*
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-5">
          <Link href="/privacy-policy" className="text-muted-foreground text-xs">
            Privacy Policy
          </Link>
          <Link href="https://www.buymeacoffee.com/statscrave" target="_blank" rel="noreferrer" className="text-muted-foreground text-xs">
            Want to support us?
          </Link>
          <Link href="mailto:statscrave@gmail.com" className="text-muted-foreground text-xs">
            Contact Us
          </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
