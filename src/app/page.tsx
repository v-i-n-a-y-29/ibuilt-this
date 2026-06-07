import FeaturedProducts from "@/components/landing-page/featured-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunched from "@/components/landing-page/recently-launcted";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/product-skeleton";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Suspense fallback=
        {
          <ProductSkeleton />
        }
      >
        <RecentlyLaunched />
      </Suspense>
    </div>
  );
}
