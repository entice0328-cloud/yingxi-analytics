import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { FilterProvider } from "@/components/filter-provider";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "营析 — 电商经营分析台",
  description:
    "面向数据分析实习的经营看板：GMV、转化漏斗、退货与客户结构，带可执行结论。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${notoSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <FilterProvider>
          <AppShell>{children}</AppShell>
        </FilterProvider>
      </body>
    </html>
  );
}
