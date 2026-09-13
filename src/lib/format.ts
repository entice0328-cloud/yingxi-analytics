export function yuan(n: number) {
  return `¥${Math.round(n).toLocaleString("zh-CN")}`;
}

export function yuanExact(n: number) {
  return `¥${n.toLocaleString("zh-CN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function pct(n: number, digits = 1) {
  if (!Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(digits)}%`;
}

export function compact(n: number) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  return Math.round(n).toLocaleString("zh-CN");
}

export function deltaPct(current: number, prev: number) {
  if (!prev) return null;
  return (current - prev) / prev;
}
