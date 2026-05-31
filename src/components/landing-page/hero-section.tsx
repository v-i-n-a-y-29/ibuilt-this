import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightFromSquare, EyeIcon, RocketIcon, SparkleIcon, UsersIcon } from "lucide-react";
import StatsCard from "./stats-card";
import FeaturedProducts from "./featured-products";

const LiveBadge = () => (
    <Badge variant="outline" className="px-3 py-4 text-sm mb-8 backdrop-blur-sm">
        <span className="relative flex h-2 w-2 ">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="text-muted-foreground">Join thousands of creators sharing their work</span>
    </Badge>
);

const statsData = [
    {
        icon: RocketIcon,
        value: "2.5K+",
        label: "Projects Shared",
    },
    {
        icon: UsersIcon,
        value: "10K+",
        label: "Active Creators",
        hasBorder: true,
    },
    {
        icon: EyeIcon,
        value: "50K+",
        label: "Monthly Visitors",
    },
];

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
            <div className="wrapper ">
                <div className="flex flex-col items-center justify-center lg:py-24 py-12  text-center">
                    <LiveBadge />
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl ">
                        Share What You&apos;ve Built, Discover What&apos;s Launching
                    </h1>
                    <p className="text-lg sm:text-xl mb-10 text-muted-foreground leading-relaxed max-w-2xl">
                        A community platform for creators to showcase their apps, AI tools, SaaS products, and creative projects. Authentic launches, real builders, genuine feedback.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <Button asChild size="lg" className="text-base px-8 shadow-sm" >
                            <Link href="/">
                                <SparkleIcon className="size-5" />
                                Share your project
                            </Link>
                        </Button>
                        <Button asChild size="lg" className="text-base px-8 shadow-sm" variant="secondary">
                            <Link href="/explore">
                                Explore projects
                                <ArrowRightIcon className="size-5" />
                            </Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
                        {statsData.map((stat) => (
                            <StatsCard key={stat.label} {...stat} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}