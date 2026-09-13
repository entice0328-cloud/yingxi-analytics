"use client";

import { FilterBar } from "@/components/filter-bar";
import { useDashboard } from "@/components/filter-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TONE = {
  high: "该先动手",
  mid: "需要盯着",
  good: "可以加码",
} as const;

export default function InsightsPage() {
  const { insights } = useDashboard();

  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-3xl">
        <p className="text-sm text-primary">分析结论</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          面试时就讲这三件事
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          看板如果只出图、不给动作，就还是作业。下面三条会随筛选条件重算，建议先看近 30 天、全部类目。
        </p>
      </div>
      <FilterBar />
      <div className="grid gap-3 lg:grid-cols-3">
        {insights.map((item, index) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">结论 {index + 1}</p>
                <Badge variant={item.severity === "high" ? "destructive" : "secondary"}>
                  {TONE[item.severity]}
                </Badge>
              </div>
              <CardTitle className="text-base leading-6">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-7">
              <p>{item.finding}</p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">建议：</span>
                {item.action}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
