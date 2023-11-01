'use client'
import CategorySection from '@/components/CategorySection'
import HeroSection from '@/components/HeroSection'
import NewProducts from '@/components/NewProducts'
import SiteDescription from '@/components/SiteDescription'
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { isSameURL } from '@/utils/SameURL'


type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // let timer: NodeJS.Timeout;

    const stopProgress = () => {
      // clearTimeout(timer);
      NProgress.done();
    };

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        stopProgress();
        return target.apply(thisArg, argArray);
      },
    });
  }, []);

  return (
    <main>
      <HeroSection />
      <CategorySection />
      <NewProducts />
      <SiteDescription />
    </main>
  )
}
