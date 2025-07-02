"use client"

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { BarChart3, BarChartIcon } from 'lucide-react';
import React from 'react'
import Link from 'next/link';


const ChartsPage = () => {
  return (
    <div>
      <div className="py-5 px-4 md:px-8">
        <div className='flex gap-2 mb-2'>

        <BarChartIcon size={32} />
        <h1 className="text-2xl font-bold">Music Charts</h1>
        </div>
        <p className="text-md">From Billboard Hot 100 to Melon Top 100, we got you covered. Explore the top music charts from around the world. All rights reserved to the respective companies.</p>
      </div>
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
        <Link href="/charts/melonCharts">
          <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
            <img className="mx-auto w-full h-32 object-cover" src="https://6.soompi.io/wp-content/uploads/image/d9fcf751a0a242638b7dc98b29e81bf2.jpeg?s=900x600&e=t" alt="BB200" />
            <p className="my-3">Melon Charts (Realtime, Daily, Weekly, Monthly)</p>
          </div>
        </Link>
        <Link href="/charts/lastFmTopTracks">
          <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
            <img className="mx-auto w-full h-32 object-cover" src="https://www.last.fm/static/images/lastfm_logo_facebook.15d8133be114.png" alt="BB200" />
            <p className="my-3">Last Fm Weekly Top Tracks</p>
          </div>
        </Link>
        
        <Link href="/charts/genie">
          <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
            <img className="mx-auto w-full h-32 object-cover" src="https://www.tuneskit.com/images/resource/genie-music.jpg" alt="BB200" />
            <p className="my-3">Genie Top 200 Tracks</p>
          </div>
        </Link>
        <Link href="/charts/bugs">
          <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
            <img className="mx-auto w-full h-32 object-cover" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Bugs%21_logo.jpg/640px-Bugs%21_logo.jpg" alt="BB200" />
            <p className="my-3">Bugs Top 100 Tracks</p>
          </div>
        </Link>
        <Link href="/charts/lastFmTopArtists">
          <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
            <img className="mx-auto w-full h-32 object-cover" src="https://www.last.fm/static/images/lastfm_logo_facebook.15d8133be114.png" alt="BB200" />
            <p className="my-3">Last Fm Weekly Top Artists</p>
          </div>
        </Link>
        <Link href="/charts/qqMusic">
          <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
            <img className="mx-auto w-full h-32 object-cover" src="https://assets.pandaily.com/uploads/2022/02/qq.jpeg" alt="QQMusic" />
            <p className="my-3">QQ Music Top 100</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ChartsPage