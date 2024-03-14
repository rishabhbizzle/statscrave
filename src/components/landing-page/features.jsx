'use client'

import React from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef } from 'react';




const features = [{
    title: "Daily Spotify Streams Gains",
    description: "Provide daily stream gains",
    image: "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  },
  {
    title: "Daily Spotify Streams Gains",
    description: "Provide daily stream gains",
    image: "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  },
  {
    title: "Daily Spotify Streams Gains",
    description: "Provide daily stream gains",
    image: "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  },
  {
    title: "Daily Spotify Streams Gains",
    description: "Provide daily stream gains",
    image: "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  }
  
  ]
  
export default function Features() {

    const featureSectionRef = useRef(null)
    const featureSectionInView = useInView(featureSectionRef)


  return (
    <div className="flex flex-col gap-10 md:gap-20 px-4 md:px-8 my-40" ref={featureSectionRef}>
          {features.map((feature, index) => (
            <div className={`flex items-center gap-6 flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} key={index}>
              <div>
                <motion.img
                  alt="Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="310"
                  src={feature.image}
                  width="550"
                  initial={{ opacity: 0, x: 100 }} // Initial state for the image
                  animate={{ opacity: featureSectionInView ? 1 : 0, x: featureSectionInView ? 0 : index % 2 === 0 ? -60 : 60 }} // Animation for the image
                  transition={{ duration: 0.5, delay: 0.2 }} // Animation duration with delay
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Features</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Faster iteration. More innovation.</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    The platform for rapid progress. Let your team focus on shipping features instead of managing
                    infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
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
