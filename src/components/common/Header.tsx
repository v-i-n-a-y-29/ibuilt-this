import { Home, Compass, Sparkle, Sparkles, CompassIcon, HomeIcon, Ghost, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Logo = () => {

    return (
        <Link href="/" className="flex items-center gap-1 group">
            <Sparkles className="size-6 text-primary" />
            <h1 className="text-2xl font-bold">i<span className="text-primary">Built</span>This</h1>
        </Link>
    );

}

export default function Header() {
    const isLoggedIn = true; // This should be determined based on your authentication logic
    return (
        <header className=" border-b sticky top-0 z-50 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
            <div className="wrapper px-12">
                <div className="flex h-16 items-center justify-between">

                    <Logo />

                    <nav className="flex items-center gap-1">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
                        >
                            <HomeIcon className="size-4" />
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/explore"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
                        >
                            <CompassIcon className="size-4" />
                            <span>Explore</span>
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3 ">
                        <Show when="signed-out">
                            <Button asChild variant="ghost" className="cursor-pointer">
                                <SignInButton />
                            </Button>
                            <Button asChild variant="default" className="cursor-pointer rounded-2xl">
                                <SignUpButton />
                            </Button>
                            
                        </Show>
                        <Show when="signed-in">
                            <Button asChild>
                                <Link href="/submit">
                                    <Sparkles className="size-5" />
                                    Submit Project
                                </Link>
                            </Button>
                            <UserButton />
                        </Show>
                    </div>
                </div>
            </div>
        </header>
    )
}
