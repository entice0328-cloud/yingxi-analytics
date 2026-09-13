"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pct, yuan } from "@/lib/format";
import type { SliceRow } from "@/lib/types";

export function SliceTable({
  title,
  rows,
}: {
  title: string;
  rows: SliceRow[];
}) {
  if (!rows.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-muted-foreground">
            没有可展示的切片。
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-muted-foreground">
            <tr className="border-b">
              <th className="py-2 font-medium">维度</th>
              <th className="py-2 font-medium">GMV</th>
              <th className="py-2 font-medium">订单</th>
              <th className="py-2 font-medium">客单价</th>
              <th className="py-2 font-medium">退货率</th>
              <th className="py-2 font-medium">浏览→支付</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-border/70 last:border-0">
                <td className="py-2 font-medium">{row.key}</td>
                <td>{yuan(row.gmv)}</td>
                <td>{row.orders.toLocaleString("zh-CN")}</td>
                <td>{yuan(row.aov)}</td>
                <td>{pct(row.refundRate)}</td>
                <td>{pct(row.payRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
