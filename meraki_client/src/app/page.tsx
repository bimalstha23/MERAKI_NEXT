import Image from "next/image";
import Link from "next/link";
import HeroSection from "./HeroSection/page";
import Categories from "./Categories/page";
import NewProduct from "./NewProduct/page";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="px-36">
        <Categories />
        <NewProduct />
      </div>
    </div>
  );
}
