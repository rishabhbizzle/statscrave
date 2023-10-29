"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { SignUpForm } from "./signUpForm";
import Image from "next/image";
import Container from "@/components/ui/container";
import AlbumCollage from "@/assets/albumCollages.jpg";
import Logo from "@/assets/logo.png";

export default function SignupPage() {
  return (
    <Container>
      <div className="relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <Link
            href="/examples/authentication"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Login
          </Link> */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <Image
            src={AlbumCollage}
            alt="Album Collage"
            layout="fill"
            objectFit="cover"
            className="opacity-25"
          />
          <div className="relative z-20 flex flex-col items-center text-lg font-medium">
            <Image
              src={Logo}
              alt="Logo"
            //   width="300"
            //   height="300"
              className=""
            />
            <p>
            StatsForFans
            </p>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SignUpForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
