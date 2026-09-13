"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  GitCompare,
  Lightbulb,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "经营概览", icon: BarChart3 },
  { href: "/funnel", label: "转化漏斗", icon: GitCompare },
  { href: "/customers", label: "客户结构", icon: Users },
  { href: "/insights", label: "结论", icon: Lightbulb },
  { href: "/method", label: "方法 / SQL", icon: FileText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const printHide = pathname === "/resume" || pathname === "/liew";

  return (
    <div className="flex min-h-full flex-col bg-[radial-gradient(1100px_420px_at_0%_-10%,oklch(0.94_0.03_250),transparent)]">
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md",
          printHide && "print:hidden",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="min-w-0">
            <p className="text-[11px] tracking-[0.2em] text-primary uppercase">
              Retail ops analytics
            </p>
            <h1 className="text-lg font-semibold tracking-tight">营析</h1>
          </Link>
          <nav className="flex flex-wrap items-center gap-1">
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
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/resume"
              className="inline-flex items-center rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              简历
            </Link>
            <Link
              href="/liew"
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1.5 text-sm",
                pathname.startsWith("/liew")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Liew CV
            </Link>
          </nav>
        </div>
      </header>
      <main
        className={cn(
          "mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6",
          printHide && "max-w-none px-0 py-0",
        )}
      >
        {children}
      </main>
    </div>
  );
}
