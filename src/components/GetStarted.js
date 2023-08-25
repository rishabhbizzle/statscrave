"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeIn, planetVariants } from "@/utils/motion";
import GetStartedImage from "@/assets/get-started.png";
import Image from "next/image";

const startingFeatures = [
    'Find a world that suits you and you want to enter',
    'Enter the world by reading basmalah to be safe',
    'No need to beat around the bush, just stay on the gas and have fun',
  ]

const GetStarted = () => (
  <section className={`sm:p-16 xs:p-8 px-6 py-12 relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`2xl:max-w-[1280px] w-full mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={planetVariants("left")}
        className={`flex-1 flex justify-center items-center`}
      >
        <Image
          src={GetStartedImage}
          alt="get-started"
          className="w-[90%] h-[90%] object-contain"
        />
      </motion.div>
      <motion.div
        variants={fadeIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] flex justify-center flex-col"
      >
        {/* <TypingText title="| How Metaversus Works" />
        <TitleText title={<>Get started with just a few clicks</>} /> */}
        <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
          {startingFeatures.map((feature, index) => (
            <div key={index} className={`flex justify-center items-center flex-row`}>
              <div
                className={`flex justify-center items-center w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]`}
              >
                <p className="font-bold text-[20px] text-white">
                  {`${index < 10 ? "0" : ""} ${index + 1}`}
                </p>
              </div>
              <p className="flex-1 ml-[30px] font-normal text-[18px] text-[#B0B0B0] leading-[32.4px]">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default GetStarted;
