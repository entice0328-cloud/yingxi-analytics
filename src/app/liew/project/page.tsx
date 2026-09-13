"use client";

import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WAREHOUSE_SUMMARY } from "@/lib/warehouse";
import { pct } from "@/lib/format";

export default function WarehouseProjectPage() {
  const { n, sameDay, scanMiss, avgDelay, lanes } = WAREHOUSE_SUMMARY;
  const delayData = lanes.map((l) => ({
    lane: l.lane.replace("Outbound-", "Out-").replace("Inbound-", "In-"),
    delay: l.avgDelay,
    miss: Number((l.scanMiss * 100).toFixed(1)),
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-3xl">
        <p className="text-sm text-primary">Liew Zhen Yu · portfolio</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Warehouse Flow Analytics
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          English operations-analytics sample for a Malaysia intern CV. 4,200 synthetic warehouse orders (not DHL data). Python source lives in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            resume/liew-zhen-yu/warehouse-flow-analytics
          </code>
          .{" "}
          <Link href="/liew" className="text-primary underline-offset-4 hover:underline">
            Back to his CV
          </Link>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi title="Orders" value={n.toLocaleString()} hint="synthetic sample" />
        <Kpi title="Same-day complete" value={pct(sameDay)} hint="across all lanes" />
        <Kpi title="Scan-miss rate" value={pct(scanMiss)} hint="highest in Outbound-South" />
        <Kpi title="Avg delay" value={`${avgDelay.toFixed(2)} h`} hint="time to complete" />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Delay by lane (hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={delayData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="lane" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="delay" fill="var(--primary)" name="Hours" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scan-miss rate (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={delayData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="lane" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="miss" fill="var(--chart-2)" name="Scan-miss %" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lane table</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b">
                <th className="py-2 font-medium">Lane</th>
                <th className="py-2 font-medium">Orders</th>
                <th className="py-2 font-medium">Same-day</th>
                <th className="py-2 font-medium">Scan-miss</th>
                <th className="py-2 font-medium">Avg delay</th>
              </tr>
            </thead>
            <tbody>
              {lanes.map((row) => (
                <tr key={row.lane} className="border-b border-border/70 last:border-0">
                  <td className="py-2 font-medium">{row.lane}</td>
                  <td>{row.orders.toLocaleString()}</td>
                  <td>{pct(row.sameDay)}</td>
                  <td>{pct(row.scanMiss)}</td>
                  <td>{row.avgDelay.toFixed(2)} h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What to say in an interview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-7 text-muted-foreground">
          <p>
            Outbound-South is the problem lane: 5.4% scan-miss and 2.22 hours delay, against Inbound-A at 2.4% and 0.93 hours. Do not add volume there until scan compliance and staffing are fixed.
          </p>
          <p>
            Run locally: <code className="rounded bg-muted px-1 py-0.5 text-xs">python3 analyze.py</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Kpi({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}
