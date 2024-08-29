'use client'

import React from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef } from 'react';


const features = [{
    title: "Personalised dashboard based on your favorites.",
    description: "Get a personalised dashboard to track your favorite tracks, albums, artists spotify streams of your favorite artists and also you can checkout recomendations based on your taste more...",
    image: "./feat1.webp"
  },
  {
    title: "Extensive streaming data, records and more.",
    description: "Get extensive streaming data, records and more about your favorite artists, albums and tracks. You can also checkout the top charts and more...",
    image: "./feat2.webp"
  },
  {
    title: "Music culture updates & news on the go.",
    description: "Stay up-to-date with the latest trends and news in music pop culture with concise and informative blog posts covering exciting news in the music industry...",
    image: "./feat3.webp"
  },
  {
    title: "Replay - Get your most played tracks and artists",
    description: "Get your most played tracks and artists for different time frames and get your music taste roasted by our AI. Share your music taste with the world!",
    image: "./replay.jpg"
  },
  ]
  
export default function Features() {

    const featureSectionRef = useRef(null)
    const featureSectionInView = useInView(featureSectionRef)


  return (
    <div className="flex flex-col gap-10 md:gap-20 px-4 md:px-8 my-12 lg:my-16" ref={featureSectionRef}>
          {features.map((feature, index) => (
            <div className={`flex items-center gap-6 flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} key={index}>
              <div className='md:w-[70%]'>
                <motion.img
                  alt="Image"
                  className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  src={feature.image}
                  initial={{ opacity: 0, x: 50 }} // Initial state for the image
                  animate={{ opacity: featureSectionInView ? 1 : 0, x: featureSectionInView ? 0 : index % 2 === 0 ? -40 : 40 }} // Animation for the image
                  transition={{ duration: 0.5, delay: 0.2 }} // Animation duration with delay
                />
              </div>
              <div className="flex flex-col justify-center space-y-4 md:w-[60%]">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Features</div>
                  <h2 className="text-2xl font-medium tracking-tighter sm:text-5xl">{feature?.title}</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
                {/* <ul className="grid gap-2 py-4">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Make collaboration seamless with built-in code review tools.
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Automate your workflow with continuous integration and delivery.
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Deploy to the cloud with a single click and scale with ease.
                  </li>
                </ul> */}
              </div>
            </div>
          ))}
        </div>
  )
}
