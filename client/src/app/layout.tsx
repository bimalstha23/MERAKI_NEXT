import HeaderMain from '@/components/HeaderMain'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import MobNavbar from '@/components/MobileNav'
import Providers from '@/Providers'
import Footer from '@/components/Footer'
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from '@vercel/analytics/react';

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
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color='#FFBA98'
          crawlSpeed={100}
          crawl={true}
          showSpinner={false}
          height={5}
        />
        <Providers>
          <HeaderMain />
          <MobNavbar />
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html >
  )
}
