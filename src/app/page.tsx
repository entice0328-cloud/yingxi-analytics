"use client";

import { CategoryBars, TrendChart } from "@/components/charts";
import { FilterBar } from "@/components/filter-bar";
import { useDashboard } from "@/components/filter-provider";
import { KpiGrid } from "@/components/kpi-grid";
import { SliceTable } from "@/components/slice-table";
import { getCatalog } from "@/lib/catalog";

export default function OverviewPage() {
  const { metrics } = useDashboard();
  const { asOf } = getCatalog();

  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-3xl">
        <p className="text-sm text-primary">电商经营分析台 · 样本数据截至 {asOf}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          先看生意，再决定把预算和库存往哪放
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          这是一份可演示的经营看板：GMV、退货、类目和渠道都可以筛选。数据是固定种子生成的店铺样本，用来讲清分析思路，不是某家真实商家的后台。
        </p>
      </div>
      <FilterBar />
      <KpiGrid />
      <div className="grid gap-3 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <TrendChart />
        </div>
        <div className="lg:col-span-2">
          <CategoryBars />
        </div>
      </div>
      <SliceTable title="类目明细" rows={metrics.byCategory} />
    </div>
  );
}
