"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/components/filter-provider";
import { deltaPct, pct, yuan } from "@/lib/format";
import { cn } from "@/lib/utils";

export function KpiGrid() {
  const { metrics } = useDashboard();
  const items = [
    {
      label: "GMV",
      value: yuan(metrics.gmv),
      delta: metrics.prev ? deltaPct(metrics.gmv, metrics.prev.gmv) : null,
      hint: "支付订单金额",
    },
    {
      label: "订单量",
      value: metrics.orders.toLocaleString("zh-CN"),
      delta: metrics.prev ? deltaPct(metrics.orders, metrics.prev.orders) : null,
      hint: "已支付订单",
    },
    {
      label: "客单价",
      value: yuan(metrics.aov),
      delta: metrics.prev ? deltaPct(metrics.aov, metrics.prev.aov) : null,
      hint: "GMV / 订单",
    },
    {
      label: "退货率",
      value: pct(metrics.refundRate),
      delta: metrics.prev
        ? deltaPct(metrics.refundRate, metrics.prev.refundRate)
        : null,
      hint: "退货金额 / GMV",
      invert: true,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} size="sm">
          <CardHeader>
            <CardTitle>{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{item.hint}</span>
              {item.delta !== null ? (
                <span
                  className={cn(
                    "font-medium",
                    (item.invert ? -item.delta : item.delta) >= 0
                      ? "text-emerald-700"
                      : "text-destructive",
                  )}
                >
                  {item.delta >= 0 ? "↑" : "↓"}
                  {pct(Math.abs(item.delta))} 环比
                </span>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
