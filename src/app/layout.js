import Navbar from '@/components/navbar'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import Footer from '@/components/footer'
import { Poppins, Roboto } from 'next/font/google'
import { Toaster } from 'sonner'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ClerkProvider } from '@clerk/nextjs'
 
const roboto = Poppins({
  weight: ["400", "500", "700", "900"],
  subsets: ['latin'],
})


export const metadata = {
  title: 'Your ultimate music analytics platform',
  description: "StatsCrave is a platform for fans to track their favorite artist's spotify streams and more...",
  metadataBase: new URL('https://statscrave.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    images: '/og-image.png',
    type: 'website',
    locale: 'en_US',
    title: 'StatsCrave - Your ultimate music analytics platform',
    description: "StatsCrave is a platform for fans to track their favorite artist's spotify streams and more...",
    site_name: 'StatsCrave',
  },
  twitter: {
    card: "summary_large_image",
    title: 'StatsCrave - Your ultimate music analytics platform',
    description: "StatsCrave is a platform for fans to track their favorite artist's spotify streams and more...",
    creator: "@StatsCrave",
    images: [
      {
        url: 'https://statscrave.com/og-image.png',
        alt: 'StatsCrave - Your ultimate music analytics platform',
      },
    ],
  },
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
            <Navbar />
            {children}
            <Toaster richColors />
            <Footer />
          </ThemeProvider>
        </body>
        <GoogleAnalytics gaId="G-9F4NHQG0XT" />
      </html>
    </ClerkProvider>
    </>
  )
}