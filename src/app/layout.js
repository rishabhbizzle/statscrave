import Navbar from '@/components/navbar'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import Footer from '@/components/footer'
import { Poppins, Roboto } from 'next/font/google'
import { Toaster } from 'sonner'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ClerkProvider } from '@clerk/nextjs'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ComparisonProvider } from '@/context/ComparisonProvider'
import { PromotionManager } from '@/components/promotions'

const roboto = Poppins({
  weight: ["400", "500", "700", "900"],
  subsets: ['latin'],
})


export const metadata = {
  title: 'StatsCrave - Your ultimate music analytics platform',
  description: "A platform which offers comprehensive streaming statistics and personalized dashboards. Track trends, discover new music, and stay updated on pop culture developments effortlessly.",
  metadataBase: new URL('https://statscrave.com'),
  keywords: ["music", "analytics", "statistics", "streaming", "platform", "trends", "spotify streams", "justin bieber", "pop culture", "statscrave"],
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    images: [
      {
        url: 'https://statscrave.com/og-image-wide.png',
        alt: 'StatsCrave - Your ultimate music analytics platform',
      },
      {
        url: 'https://statscrave.com/og-image2.jpg',
        alt: 'StatsCrave - Your ultimate music analytics platform',
      },
    ],
    type: 'website',
    locale: 'en_US',
    title: 'StatsCrave - Your ultimate music analytics platform',
    description: "A platform which offers comprehensive streaming statistics and personalized dashboards. Track trends, discover new music, and stay updated on pop culture developments effortlessly.",
    site_name: 'StatsCrave',
  },
  // metadataBase: {
  // 	host: "https://statscrave.com",
  // 	href: "/",
  // 	origin: "https://statscrave.com",
  // 	password: "statscrave",
  // 	hash: "statscrave",
  // 	pathname: "/",
  // 	search: "",
  // 	username: "statscrave",
  // 	hostname: "statscrave.com",
  // 	port: "",
  // 	protocol: "https:",
  // 	searchParams: new URLSearchParams(""),
  // 	toString: () => "https://statscrave.com/",
  // 	toJSON: () => "https://statscrave.com/",
  // },
  twitter: {
    card: "summary_large_image",
    title: 'StatsCrave - Your ultimate music analytics platform',
    url: 'https://statscrave.com',
    description: "A platform which offers comprehensive streaming statistics and personalized dashboard. Track trends, discover new music, and stay updated on pop culture developments effortlessly.",
    creator: "@StatsCrave",
    images: [
      {
        url: 'https://i.postimg.cc/C10cs3Sf/og-image-wide.png',
        alt: 'StatsCrave - Your ultimate music analytics platform!!',
      },
    ],
  },
  manifest: "/manifest.json",
}


export default function RootLayout({ children }) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <head />
          <body className={roboto.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              {/* Promotional Banner System - Easy to remove by commenting out */}
              <PromotionManager />
              
              <ComparisonProvider>
                <Navbar />
                {children}
                {/* <SpeedInsights /> */}
                <Toaster richColors />
                <Footer />
              </ComparisonProvider>
            </ThemeProvider>
          </body>
          <GoogleAnalytics gaId="G-9F4NHQG0XT" />
        </html>
      </ClerkProvider>
    </>
  )
}