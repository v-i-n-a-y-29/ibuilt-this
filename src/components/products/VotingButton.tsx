'use client'
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { downvoteProductAction, upvoteProductAction } from "@/lib/products/product-actions";
import { useOptimistic, useTransition } from "react";






export default function VotingButton({ voteCount:initialVoteCount, productId }: { voteCount: number; productId: number }) {

    const [isPending, startTransition] = useTransition();

    const handleUpvote = async (productId: number) => {
        startTransition(async () => {
            setOptimisticVoteCount(1);
            const result = await upvoteProductAction(productId);
            console.log("result",result);
        });
    }
    const handleDownvote = async (productId: number) => {
        startTransition(async () => {
            setOptimisticVoteCount(-1);
            const result = await downvoteProductAction(productId);
            console.log("result",result);
        });
    }

    const [optimisticVoteCount, setOptimisticVoteCount] = 
    useOptimistic(initialVoteCount , (currentCount , change:number) => Math.max(0, currentCount + change ));
    return (
        <div className="flex flex-col items-center gap-1 shrink-0" 
            onClick={(e)=>{
            e.preventDefault();
            e.stopPropagation();}
            }>

            <Button
                variant="ghost"
                size="icon-sm"
                className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary"
                onClick={() => handleUpvote(productId)}
            >
                <ChevronUpIcon className="size-5" />
            </Button>

            <span className="text-sm text-muted-foreground">{optimisticVoteCount}</span>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary opacity-60 hover:opacity-100 hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDownvote(productId)}
            >
                <ChevronDownIcon className="size-5" />
            </Button>
        </div>
    )
}