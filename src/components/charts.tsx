"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/components/filter-provider";
import { pct, yuan } from "@/lib/format";

export function TrendChart() {
  const { metrics } = useDashboard();
  const data = metrics.daily.map((d) => ({
    ...d,
    label: d.date.slice(5),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>GMV 趋势</CardTitle>
      </CardHeader>
      <CardContent>
        {data.every((d) => d.gmv === 0) ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            当前筛选没有订单。
          </p>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} />
                <Tooltip
                  formatter={(value) => yuan(Number(value ?? 0))}
                  labelFormatter={(label) => `日期 ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="gmv"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={false}
                  name="GMV"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function CategoryBars() {
  const { metrics } = useDashboard();
  return (
    <Card>
      <CardHeader>
        <CardTitle>类目 GMV</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={metrics.byCategory} layout="vertical" margin={{ left: 16 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="key" width={72} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => yuan(Number(value ?? 0))} />
              <Bar dataKey="gmv" fill="var(--primary)" radius={[0, 6, 6, 0]} name="GMV" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function FunnelBars() {
  const { metrics } = useDashboard();
  const { views, carts, orders, pays } = metrics.funnel;
  const data = [
    { step: "浏览", n: views },
    { step: "加购", n: carts },
    { step: "下单", n: orders },
    { step: "支付", n: pays },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>漏斗人数</CardTitle>
      </CardHeader>
      <CardContent>
        {views === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            当前筛选没有流量。
          </p>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="n" fill="var(--primary)" radius={[6, 6, 0, 0]} name="人次" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
          <li>浏览→加购 {pct(views ? carts / views : 0)}</li>
          <li>加购→下单 {pct(carts ? orders / carts : 0)}</li>
          <li>下单→支付 {pct(orders ? pays / orders : 0)}</li>
        </ul>
      </CardContent>
    </Card>
  );
}
