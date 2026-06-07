import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductSkeleton() {
    return (
        <section className="py-20">
            <div className="wrapper space-y-10">
                <div className="flex items-center gap-4 mb-10">
                    <Skeleton className="w-8 h-8 rounded-md" />
                    <Skeleton className="w-64 h-10 rounded-md" />
                    <Skeleton className="w-24 h-10 rounded-md ml-auto hidden sm:block" />
                </div>

                <div className="grid-wrapper">
                    {
                        Array.from({length: 4}).map((_, index) => (
                            <Card key={index} className="min-h-[180px]">
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-1 min-w-0">
                                            {/* Title and Badge */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <Skeleton className="h-6 w-1/2" />
                                                <Skeleton className="h-5 w-24 rounded-full" />
                                            </div>
                                            {/* Description Lines */}
                                            <Skeleton className="h-4 w-full mb-2" />
                                            <Skeleton className="h-4 w-4/5" />
                                        </div>
                                        
                                        {/* Voting Column */}
                                        <div className="flex flex-col items-center gap-2 shrink-0">
                                            <Skeleton className="h-8 w-8 rounded-md" />
                                            <Skeleton className="h-4 w-6 rounded-md" />
                                            <Skeleton className="h-8 w-8 rounded-md" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardFooter>
                                    {/* Tags */}
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                        <Skeleton className="h-5 w-20 rounded-full" />
                                        <Skeleton className="h-5 w-14 rounded-full" />
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}