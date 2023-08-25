import Hero from '@/components/Hero'
import "./globals.css"
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import GetStarted from '@/components/GetStarted'

export default function Home() {
  return (
    <div className="bg-black overflow-hidden">
      <Navbar />
      <Hero />
      <div className="relative">
        <GetStarted />
        <div className="gradient-04 z-0" />
      </div>
    </div>
  )
}
