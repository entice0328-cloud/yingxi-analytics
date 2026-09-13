"use client";

import { FilterBar } from "@/components/filter-bar";
import { useDashboard } from "@/components/filter-provider";
import { SliceTable } from "@/components/slice-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pct, yuan } from "@/lib/format";

export default function CustomersPage() {
  const { metrics } = useDashboard();

  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-3xl">
        <p className="text-sm text-primary">客户结构</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          新客把盘子做大，老客决定能不能留下利润
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          只看拉新会高估增长。这里拆新客 / 老客 GMV，以及筛选期内下过两单及以上的用户占比。
        </p>
      </div>
      <FilterBar />
      <div className="grid gap-3 md:grid-cols-3">
        <Card size="sm">
          <CardHeader>
            <CardTitle>老客 GMV 占比</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{pct(metrics.returningGmvShare)}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {yuan(metrics.gmv * metrics.returningGmvShare)}
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>新客 GMV 占比</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{pct(metrics.newGmvShare)}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              拉新渠道要配转化，而不是只配曝光
            </p>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>复购用户占比</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{pct(metrics.repeatUserShare)}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {metrics.repeatUsers.toLocaleString("zh-CN")} /{" "}
              {metrics.payingUsers.toLocaleString("zh-CN")} 名付款用户在本期内下过 ≥2 单
            </p>
          </CardContent>
        </Card>
      </div>
      <SliceTable title="渠道质量" rows={metrics.byChannel} />
    </div>
  );
}
