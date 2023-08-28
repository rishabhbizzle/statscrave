import React from 'react'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'


const Artist = () => {
    return (
        <div 
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          2xl:grid-cols-8 
          gap-4 
          mt-4
        "
      >
        <div>
            <div
                className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3
      "
            >
                <div
                    className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
                >
                    <Image
                        className="object-cover"
                        src={'/song.jpeg'}
                        fill
                        alt="Image"
                    />
                </div>
                <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                    <p className="font-semibold truncate w-full">
                        STAY (with Justin Bieber)
                    </p>
                    <p
                        className="
            text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
                    >
                        By Justin Bieber, The Kid LAROI
                    </p>
                </div>
                <div
                    className="
          absolute 
          bottom-24 
          right-5
        "
                >
                    <button
                        className="
        transition 
        opacity-0 
        rounded-full 
        flex 
        items-center 
        justify-center 
        bg-green-500 
        p-4 
        drop-shadow-md 
        translate
        translate-y-1/4
        group-hover:opacity-100 
        group-hover:translate-y-0
        hover:scale-110
      "
                    >
                        <FaPlay className="text-black" />
                    </button>
                </div>
            </div>
        </div>
        </div>
        
       
    )
}

export default Artist