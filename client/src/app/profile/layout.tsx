import Providers from "@/Providers"
import Footer from "@/components/Footer"
import HeaderMain from "@/components/HeaderMain"
import MobNavbar from "@/components/MobileNav"
import { Roboto } from "next/font/google"

const inter = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
    preload: true,
    adjustFontFallback: true,
})



export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={inter.className}>
            {children}
        </main>
    )
}