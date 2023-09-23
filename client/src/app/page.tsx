import CategorySection from '@/components/CategorySection'
import HeroSection from '@/components/HeroSection'
import NewProducts from '@/components/NewProducts'
import SiteDescription from '@/components/SiteDescription'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <NewProducts />
      <SiteDescription />
    </main>
  )
}
