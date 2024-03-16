"use client";

import React from "react";
import { ArrowBigDownDash, CheckIcon, FileText } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { SignIn, SignInButton } from "@clerk/nextjs";
import HeroImg from '@/assets/hero1.webp'

const HeroSection = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const heroSectionRef = useRef(null);
  const heroSectionInView = useInView(heroSectionRef);

  return (
    <div className="flex min-h-[85vh] p-8 mb-14 justify-center items-center">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center">
          <motion.div
            initial="hidden"
            className="max-w-2xl"
            ref={heroSectionRef}
            animate={heroSectionInView ? "show" : "hidden"}
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.h1
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="space-x-4 text-5xl font-bold tracking-tight sm:text-7xl"
            >
              <div className="text-primary">Spotracker</div>
            </motion.h1>
            <motion.p
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="space-x-4 text-xl font-bold tracking-tight sm:text-3xl mt-3"
            >
              Your ultimate music analytics platform
            </motion.p>

            <motion.p
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="mt-6 text-base sm:text-lg leading-8 "
            >
  Dive into our comprehensive streaming analytics to uncover the pulse of your favorite artists, albums, and songs and much more.
            </motion.p>

            <motion.div
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="mt-10 flex items-center  gap-x-6 "
            >
              <SignInButton>

              <Button variant="secondary">
                <ArrowBigDownDash className="w-5 h-5 mr-2 hover:animate-spin" />
                Get Started
              </Button>
              </SignInButton>
              <Link href="/updates">
                <Button variant="outline">
                  <FileText className="w-5 h-5 mr-2 hover:animate-spin" />
                  Read Updates
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="hidden md:flex">
            <Image src={HeroImg} alt="Spotracker" className="rounded-lg" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
