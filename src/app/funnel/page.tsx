"use client";

import { FunnelBars } from "@/components/charts";
import { FilterBar } from "@/components/filter-bar";
import { useDashboard } from "@/components/filter-provider";
import { SliceTable } from "@/components/slice-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pct } from "@/lib/format";

export default function FunnelPage() {
  const { metrics } = useDashboard();
  const { views, carts, orders, pays } = metrics.funnel;

  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-3xl">
        <p className="text-sm text-primary">转化漏斗</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          流量在哪一层离开，比再买一波点击更重要
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          浏览多不等于赚钱。这里把浏览、加购、下单、支付拆开，并按渠道看谁在浪费曝光。
        </p>
      </div>
      <FilterBar />
      <FunnelBars />
      <div className="grid gap-3 md:grid-cols-3">
        <StepCard
          title="浏览 → 加购"
          value={pct(views ? carts / views : 0)}
          note="商品页和价格是否让人愿意放进购物车"
        />
        <StepCard
          title="加购 → 下单"
          value={pct(carts ? orders / carts : 0)}
          note="通常是最大缺口：运费、凑单、库存、优惠叠加"
        />
        <StepCard
          title="下单 → 支付"
          value={pct(orders ? pays / orders : 0)}
          note="支付失败、风控、货到付款取消"
        />
      </div>
      <SliceTable title="渠道转化" rows={metrics.byChannel} />
    </div>
  );
}

function StepCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
}
