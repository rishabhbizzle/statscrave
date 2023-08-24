import Hero from '@/components/Hero'
import "./globals.css"
import Navbar from '@/components/Navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-black overflow-hidden">
      <Navbar />
      <Hero />
    </div>
  )
}
