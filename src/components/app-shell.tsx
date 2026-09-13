"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPinned, Sparkles, SquareKanban } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "投递看板", icon: SquareKanban },
  { href: "/companies", label: "武汉名录", icon: MapPinned },
  { href: "/prep", label: "面试怎么讲", icon: Sparkles },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-col bg-[radial-gradient(1200px_500px_at_10%_-10%,oklch(0.93_0.04_185),transparent),radial-gradient(900px_400px_at_100%_0%,oklch(0.95_0.03_75),transparent)]">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="min-w-0">
            <p className="text-[11px] tracking-[0.22em] text-primary uppercase">
              Wuhan intern desk
            </p>
            <h1 className="truncate text-lg font-semibold tracking-tight">
              江城投递
            </h1>
          </Link>
          <nav className="flex items-center gap-1 rounded-full border bg-card/80 p-1 shadow-sm">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}
