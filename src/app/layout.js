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
  title: 'StatsCrave - By the fans, for the fans.',
  description: "StatsCrave is a platform for fans to track their favorite artist's spotify streams and more...",
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
        <GoogleAnalytics gaId="G-26F19XD7EF" />
      </html>
    </ClerkProvider>
    </>
  )
}