"use client"

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { BarChart3 } from 'lucide-react';
import React from 'react'
import Link from 'next/link';


const ChartsPage = () => {
  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-center py-10 px-4 md:px-8 text-white">
        <Link href="/charts/hot100">
        <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
          <img className="mx-auto w-full h-32 object-cover" src='./head.jpg' alt="HOT100" />
          <p className="my-3 ">Billboard Hot 100</p>
        </div>
        </Link>
        <Link href="/charts/global200">
        <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
          <img className="mx-auto w-full h-32 object-cover" src="./global.jpg" alt="GLOBAL200" />
          <p className="my-3 ">Billboard Global 200</p>
        </div>
        </Link>
        <Link href="/charts/album200">
        <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
          <img className="mx-auto w-full h-32 object-cover" src="./album.png" alt="BB200" />
          <p className="my-3">Billboard 200 (Albums)</p>
        </div>
        </Link>
        <Link href="/charts/artist100">
        <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
          <img className="mx-auto w-full h-32 object-cover" src="./artist.png" alt="BB200" />
          <p className="my-3">Billboard Artist 100</p>
        </div>
        </Link>
        <Link href="/charts/lastFmTopTracks">
        <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
          <img className="mx-auto w-full h-32 object-cover" src="https://www.last.fm/static/images/lastfm_logo_facebook.15d8133be114.png" alt="BB200" />
          <p className="my-3">Last Fm Top Tracks</p>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default ChartsPage