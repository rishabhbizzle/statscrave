'use client';


import Link from "next/link"
import { cn } from "@/lib/utils"
import { MainNav } from "./navbar/main-nav"
import { Github, Twitter } from "lucide-react"
import { CommandMenu } from "./navbar/command-menu"
import { Button, buttonVariants } from "./ui/button"
import { MobileNav } from "./navbar/mobile-nav"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { UserMenu } from "./navbar/user-menu";


export default function Navbar() {

  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-auto flex-1 md:w-auto md:flex-none">
            {isAuthenticated && (
              <CommandMenu />
            )}
          </div>
          <nav className="flex items-center justify-end gap-2">
            {/* <Link
              href='/'
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link> */}
            <Link
              href='/'
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Twitter className=" h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            {isAuthenticated ? (
              <UserMenu user={user} />
            ) : (
              <LoginLink>
                <Button variant="secondary">Login</Button>
              </LoginLink>
            )}

          </nav>
        </div>
      </div>
    </header>
  )
}