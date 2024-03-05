import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { BarChart3 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import Hot from "@/assets/head.jpg";
import Global from "@/assets/global.jpg";
import Artist from "@/assets/artist.png";
import Album from "@/assets/album.png";
import Link from 'next/link';


const ChartsPage = () => {
  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-center py-10 px-4 md:px-8 text-white">
        <Link href="/charts/hot100">
        <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
          <Image className="mx-auto" src={Hot} alt="HTML icon" />
          <p className="pt-9 pb-1 ">Billboard Hot 100</p>
        </div>
        </Link>
        <Link href="/charts/global200">
        <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
          <Image className="mx-auto" src={Global} alt="HTML icon" />
          <p className="my-3 ">Billboard Global 200</p>
        </div>
        </Link>
        <Link href="/charts/album200">
        <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
          <Image className="mx-auto" src={Album} alt="HTML icon" />
          <p className="my-3">Billboard 200 (Albums)</p>
        </div>
        </Link>
        <Link href="/charts/artist100">
        <div className="shadow-md shadow-[#040c16] hover:scale-110 duration-500 m-4 bg-black">
          <Image className="mx-auto" src={Artist} alt="HTML icon" />
          <p className="my-3">Billboard Artist 100</p>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default ChartsPage