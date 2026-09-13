import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { ApplicationsProvider } from "@/components/applications-provider";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "江城投递 — 武汉实习投递工作台",
  description:
    "面向武汉求职的实习投递看板：记录公司与进度，整理本地名录，准备面试话术。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${notoSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <ApplicationsProvider>
          <AppShell>{children}</AppShell>
        </ApplicationsProvider>
      </body>
    </html>
  );
}
