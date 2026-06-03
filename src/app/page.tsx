import FeaturedProducts from "@/components/landing-page/featured-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunched from "@/components/landing-page/recently-launcted";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Suspense fallback=
      {
        <div className="wrapper py-20 items-center">
          Loading recently launched products...
          <LoaderIcon className="animate-spin size-5 text-primary mt-4" />
        </div>
      }
      >
        <RecentlyLaunched />
      </Suspense>
    </div>
  );
}
