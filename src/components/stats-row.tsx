"use client";

import { useMemo } from "react";
import { useApplications } from "@/components/applications-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STAGE_LABEL, type Stage } from "@/lib/types";

const FOCUS: Stage[] = ["applied", "interview", "offer"];

export function StatsRow() {
  const { applications, ready } = useApplications();

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const due = applications.filter(
      (item) =>
        item.nextActionAt &&
        item.nextActionAt <= today &&
        item.stage !== "rejected" &&
        item.stage !== "offer",
    ).length;
    const byStage = FOCUS.map((stage) => ({
      stage,
      count: applications.filter((item) => item.stage === stage).length,
    }));
    return {
      total: applications.length,
      due,
      byStage,
    };
  }, [applications]);

  if (!ready) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-2xl border bg-muted/60"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Card size="sm">
        <CardHeader>
          <CardTitle>全部记录</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tracking-tight">{stats.total}</p>
          <p className="text-xs text-muted-foreground">存在本地浏览器</p>
        </CardContent>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardTitle>今天该跟进</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tracking-tight">{stats.due}</p>
          <p className="text-xs text-muted-foreground">下一步已到期</p>
        </CardContent>
      </Card>
      {stats.byStage.map((item) => (
        <Card key={item.stage} size="sm" className="hidden lg:block">
          <CardHeader>
            <CardTitle>{STAGE_LABEL[item.stage]}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">
              {item.count}
            </p>
            <p className="text-xs text-muted-foreground">当前管道</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
