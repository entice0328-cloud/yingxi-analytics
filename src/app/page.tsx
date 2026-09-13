"use client";

import { DataToolbar } from "@/components/data-toolbar";
import { PipelineBoard } from "@/components/pipeline-board";
import { StatsRow } from "@/components/stats-row";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm text-primary">给下周武汉投递用的工作台</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            把「想投、已投、面试、Offer」摊开看
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            记录公司、岗位、来源和下一步动作。卡片可以拖到不同列，数据保存在本机浏览器，离开页面也不会丢。
          </p>
        </div>
        <DataToolbar />
      </div>
      <StatsRow />
      <PipelineBoard />
    </div>
  );
}
