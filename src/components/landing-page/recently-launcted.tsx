import { RocketIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import ProductCard from "../products/ProductCard";
import EmptyState from "../common/empty-state";
import { getRecentlyLaunchedProducts } from "@/lib/products/product-select";

export default async function RecentlyLaunched() {
    const recentlyLaunchedProducts = await getRecentlyLaunchedProducts(); // Fetch recently launched products from the database
    return (
        <section className="py-20">
            <div className="wrapper">
                <SectionHeader title="Recently Launched" icon={RocketIcon} description="Discover the latest projects launched by our community!" />
                {recentlyLaunchedProducts.length === 0 ? 
                (
                    <EmptyState message="No recently launched products available." />
                ) : 
                (
                    <div className="grid-wrapper ">
                        {recentlyLaunchedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}