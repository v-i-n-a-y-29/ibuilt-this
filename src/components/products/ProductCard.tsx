import Link from "next/link";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription
} from "../ui/card";
import { Badge } from "../ui/badge";
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";

type Product = InferSelectModel<typeof products>; // Assuming you have a products table defined in your schema

export default function ProductCard({ product }: { product: Product }) {
    const hasVoted = false; // This should be determined based on user interaction, e.g., from state or props
    return (
        <Link href={`/products/${product.id}`}>
            <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-500 min-h-[180px]">
                <CardHeader >
                    <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">

                            <div className="flex items-center gap-2 mb-1">
                                <CardTitle className="text-lg group-hover:text-primary transition-colors   duration-200">
                                    {product.name}
                                </CardTitle>
                                <Badge variant="default" >
                                    <StarIcon className="size-4" />
                                    {product.voteCount > 100 ? "Featured" : "Not Featured"}
                                </Badge>
                            </div>
                            <CardDescription>{product.description}</CardDescription>
                        </div>
                        {/* vote count */}
                        <div className="flex flex-col items-center gap-1 shrink-0">

                            <Button
                                variant="ghost"
                                size="icon-sm"
                                className={cn(
                                    "h-8 w-8 text-primary",
                                    hasVoted
                                        ? "hover:bg-primary/20 bg-primary/10"
                                        : "hover:bg-primary/10 hover:text-primary"
                                )}
                            >
                                <ChevronUpIcon className="size-5" />
                            </Button>

                            <span className="text-sm text-muted-foreground">{product.voteCount}</span>

                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "h-8 w-8 text-primary",
                                    hasVoted
                                        ? "hover:text-destructive"
                                        : "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <ChevronDownIcon className="size-5" />
                            </Button>
                        </div>
                    </div>

                </CardHeader>
                <CardFooter>
                    <div className="flex items-center gap-2">
                        {product.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}