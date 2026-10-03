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
        <p className="text-sm text-primary">电商经营分析台 · 数据截至 {asOf}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          先看生意，再决定把预算和库存往哪放
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          按时间、类目和渠道查看 GMV、退货和订单。数据按固定规则生成，时段 90 天，不是真实商家后台。
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
