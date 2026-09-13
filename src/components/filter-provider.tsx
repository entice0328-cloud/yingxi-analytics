"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { buildInsights, type Insight } from "@/lib/insights";
import { computeMetrics, defaultFilters } from "@/lib/metrics";
import type { Filters, Metrics } from "@/lib/types";

interface FilterStore {
  filters: Filters;
  setFilters: (next: Partial<Filters>) => void;
  metrics: Metrics;
  insights: Insight[];
}

const FilterContext = createContext<FilterStore | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilterState] = useState<Filters>(defaultFilters);
  const metrics = useMemo(() => computeMetrics(filters), [filters]);
  const insights = useMemo(() => buildInsights(metrics), [metrics]);

  const setFilters = (next: Partial<Filters>) => {
    setFilterState((prev) => ({ ...prev, ...next }));
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, metrics, insights }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useDashboard must be used in FilterProvider");
  return ctx;
}
