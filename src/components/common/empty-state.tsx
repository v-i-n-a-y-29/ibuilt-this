import { Calendar } from "lucide-react";

export default function EmptyState({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-10 border-1 border-dashed border-border">
            <Calendar className="size-10 text-muted-foreground opacity-40" />
            <p className="text-muted-foreground">{message}</p>
        </div>
    )
}