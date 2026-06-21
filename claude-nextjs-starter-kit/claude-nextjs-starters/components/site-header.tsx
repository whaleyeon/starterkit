import Link from "next/link";
import { Layers } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Layers className="size-5" />
          <span>NextStarter</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/" className="transition-colors hover:text-foreground">
            홈
          </Link>
          <Link href="#features" className="transition-colors hover:text-foreground">
            기능
          </Link>
          <Link href="#components" className="transition-colors hover:text-foreground">
            컴포넌트
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
