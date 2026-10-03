"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCatalog } from "@/lib/catalog";
import { SQL_SNIPPETS } from "@/lib/sql-snippets";

export default function MethodPage() {
  const { orders, funnel, start, asOf } = getCatalog();

  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-3xl">
        <p className="text-sm text-primary">口径与 SQL</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          指标定义和对应 SQL
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          统计区间 {start} 至 {asOf}，共 {orders.length.toLocaleString("zh-CN")}{" "}
          条支付订单、{funnel.length.toLocaleString("zh-CN")}{" "}
          条漏斗日切片。看板里的汇总在应用内完成，下面是同等口径的 SQL。
        </p>
      </div>
      <Card size="sm">
        <CardHeader>
          <CardTitle>指标口径</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-7 text-muted-foreground">
          <p>GMV：支付成功订单金额，未剔除退货。</p>
          <p>退货率：退货金额 / GMV。退货按整单金额计入，便于突出类目差异。</p>
          <p>客单价：GMV / 支付订单数。</p>
          <p>浏览→支付：漏斗支付人次 / 浏览人次。</p>
          <p>新客：该笔订单是该用户的第一笔；老客为其后订单。</p>
          <p>环比：当前筛选窗口与紧挨着的上一段同样长的窗口对比。</p>
        </CardContent>
      </Card>
      {SQL_SNIPPETS.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle className="text-base">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-xl bg-muted/70 p-4 text-xs leading-6">
              {item.sql}
            </pre>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
