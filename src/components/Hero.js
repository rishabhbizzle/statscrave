"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { slideIn, staggerContainer, textVariant } from '@/utils/motion';
import Image from 'next/image'
import HeroImage from "@/assets/cover.png"

const Hero = () => {
  return (
    <section className="flex justify-center sm:py-16 xs:py-8 py-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-[90%] mx-auto flex flex-col"
      >
        <div className="flex justify-center items-center flex-col relative z-10 mb-14">
          <motion.h1 variants={textVariant(1.1)} className="font-bold lg:text-[120px] md:text-[80px] sm:text-[55px] text-[45px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-white">
            SpotAnalytics
          </motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className="flex flex-row justify-center items-center"
          >
            <h1 className="font-bold lg:text-[40px] md:text-[25px] sm:text-[20px] text-[15px] uppercase text-white">By the fans for the fans</h1>
            {/* <div className="md:w-[212px] sm:w-[80px] w-[60px] md:h-[108px] sm:h-[48px] h-[38px] md:border-[18px] border-[9px] rounded-r-[50px] rounded-l-[50px] border-white sm:mx-2 mx-[6px]"/> */}
            {/* <h1 className="font-bold lg:text-[144px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-white">Ness</h1> */}
          </motion.div>
        </div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="relative w-full md:-mt-[20px] -mt-[12px]"
        >
          <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />

          <Image
            src={HeroImage}
            alt="hero_cover"
            className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero