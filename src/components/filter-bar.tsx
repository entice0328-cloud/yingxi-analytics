"use client";

import { CATEGORIES, CHANNELS } from "@/lib/catalog";
import { useDashboard } from "@/components/filter-provider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RangeKey } from "@/lib/types";

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "近 7 天" },
  { key: "30d", label: "近 30 天" },
  { key: "90d", label: "近 90 天" },
];

export function FilterBar() {
  const { filters, setFilters } = useDashboard();

  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card/80 p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-1">
        {RANGES.map((item) => (
          <Button
            key={item.key}
            size="sm"
            variant={filters.range === item.key ? "default" : "outline"}
            onClick={() => setFilters({ range: item.key })}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Select
          value={filters.category}
          onValueChange={(v) =>
            setFilters({ category: (v as typeof filters.category) ?? "all" })
          }
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类目</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.channel}
          onValueChange={(v) =>
            setFilters({ channel: (v as typeof filters.channel) ?? "all" })
          }
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部渠道</SelectItem>
            {CHANNELS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
