import { CATEGORIES, CHANNELS, type Filters, type Metrics, type SliceRow } from "./types";
import { getCatalog } from "./catalog";
import { dateShift } from "./dates";

function inRange(date: string, start: string, end: string) {
  return date >= start && date <= end;
}

function windowFor(range: Filters["range"], asOf: string) {
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  return {
    start: dateShift(asOf, -(days - 1)),
    end: asOf,
    prevStart: dateShift(asOf, -(days * 2 - 1)),
    prevEnd: dateShift(asOf, -days),
  };
}

function matchSlice(filters: Filters, category: string, channel: string) {
  if (filters.category !== "all" && category !== filters.category) return false;
  if (filters.channel !== "all" && channel !== filters.channel) return false;
  return true;
}

function rate(num: number, den: number) {
  return den === 0 ? 0 : num / den;
}

function summarizeOrders(
  orders: ReturnType<typeof getCatalog>["orders"],
  start: string,
  end: string,
  filters: Filters,
) {
  const rows = orders.filter(
    (o) =>
      inRange(o.date, start, end) && matchSlice(filters, o.category, o.channel),
  );
  const gmv = rows.reduce((s, o) => s + o.gmv, 0);
  const refund = rows.reduce((s, o) => s + o.refund, 0);
  const newGmv = rows.filter((o) => o.isNew).reduce((s, o) => s + o.gmv, 0);
  const userOrders = new Map<number, number>();
  for (const o of rows) {
    userOrders.set(o.userId, (userOrders.get(o.userId) ?? 0) + 1);
  }
  const payingUsers = userOrders.size;
  const repeatUsers = [...userOrders.values()].filter((n) => n >= 2).length;
  return {
    rows,
    gmv,
    orders: rows.length,
    refund,
    aov: rate(gmv, rows.length),
    refundRate: rate(refund, gmv),
    newGmv,
    payingUsers,
    repeatUsers,
  };
}

function funnelTotals(
  funnel: ReturnType<typeof getCatalog>["funnel"],
  start: string,
  end: string,
  filters: Filters,
) {
  const rows = funnel.filter(
    (r) =>
      inRange(r.date, start, end) && matchSlice(filters, r.category, r.channel),
  );
  return rows.reduce(
    (acc, r) => {
      acc.views += r.views;
      acc.carts += r.carts;
      acc.orders += r.orders;
      acc.pays += r.pays;
      return acc;
    },
    { views: 0, carts: 0, orders: 0, pays: 0 },
  );
}

function slices(
  orders: ReturnType<typeof getCatalog>["orders"],
  funnel: ReturnType<typeof getCatalog>["funnel"],
  start: string,
  end: string,
  filters: Filters,
  keys: readonly string[],
  kind: "category" | "channel",
): SliceRow[] {
  return keys.map((key) => {
    const next: Filters = {
      ...filters,
      ...(kind === "category"
        ? { category: key as Filters["category"] }
        : { channel: key as Filters["channel"] }),
    };
    const o = summarizeOrders(orders, start, end, next);
    const f = funnelTotals(funnel, start, end, next);
    return {
      key,
      gmv: o.gmv,
      orders: o.orders,
      aov: o.aov,
      refundRate: o.refundRate,
      payRate: rate(f.pays, f.views),
    };
  });
}

export function computeMetrics(filters: Filters): Metrics {
  const { asOf, orders, funnel } = getCatalog();
  const { start, end, prevStart, prevEnd } = windowFor(filters.range, asOf);
  const cur = summarizeOrders(orders, start, end, filters);
  const prev = summarizeOrders(orders, prevStart, prevEnd, filters);
  const funnelNow = funnelTotals(funnel, start, end, filters);

  const dailyMap = new Map<
    string,
    { date: string; gmv: number; orders: number; refund: number }
  >();
  for (let d = start; d <= end; d = dateShift(d, 1)) {
    dailyMap.set(d, { date: d, gmv: 0, orders: 0, refund: 0 });
  }
  for (const o of cur.rows) {
    const point = dailyMap.get(o.date);
    if (!point) continue;
    point.gmv += o.gmv;
    point.orders += 1;
    point.refund += o.refund;
  }

  const hasPrev = prev.orders > 0;

  return {
    gmv: cur.gmv,
    orders: cur.orders,
    aov: cur.aov,
    refundRate: cur.refundRate,
    refundAmount: cur.refund,
    payRate: rate(funnelNow.pays, funnelNow.views),
    newGmvShare: rate(cur.newGmv, cur.gmv),
    returningGmvShare: 1 - rate(cur.newGmv, cur.gmv),
    repeatUserShare: rate(cur.repeatUsers, cur.payingUsers),
    repeatUsers: cur.repeatUsers,
    payingUsers: cur.payingUsers,
    daily: [...dailyMap.values()],
    byCategory: slices(orders, funnel, start, end, filters, CATEGORIES, "category"),
    byChannel: slices(orders, funnel, start, end, filters, CHANNELS, "channel"),
    funnel: funnelNow,
    prev: hasPrev
      ? {
          gmv: prev.gmv,
          orders: prev.orders,
          refundRate: prev.refundRate,
          aov: prev.aov,
        }
      : null,
  };
}

export function defaultFilters(): Filters {
  return { range: "30d", category: "all", channel: "all" };
}
