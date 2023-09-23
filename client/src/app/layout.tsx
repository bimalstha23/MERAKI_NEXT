import HeaderMain from '@/components/HeaderMain'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Navbar from '@/components/Navbar'
import MobNavbar from '@/components/MobileNav'
import Providers from '@/Providers'
import Footer from '@/components/Footer'

const inter = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})


export const metadata: Metadata = {
  title: 'MERAKI',
  description: 'Home of the best products in the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Providers>
          <HeaderMain />
          <Navbar />
          <MobNavbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html >
  )
}
