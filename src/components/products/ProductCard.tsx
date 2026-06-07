import Link from "next/link";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription
} from "../ui/card";
import { Badge } from "../ui/badge";
import { StarIcon } from "lucide-react";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import VotingButton from "./VotingButton";

type Product = InferSelectModel<typeof products>; // Assuming you have a products table defined in your schema

export default function ProductCard({ product }: { product: Product }) {
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
                        <VotingButton voteCount={product.voteCount} productId={product.id} />
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