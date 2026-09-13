export const CATEGORIES = [
  "数码配件",
  "家居收纳",
  "个护清洁",
  "食品饮料",
  "运动户外",
] as const;

export const CHANNELS = ["自然搜索", "信息流广告", "直播", "老客复访"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Channel = (typeof CHANNELS)[number];
export type RangeKey = "7d" | "30d" | "90d";

export interface Filters {
  range: RangeKey;
  category: "all" | Category;
  channel: "all" | Channel;
}

export interface FunnelRow {
  date: string;
  category: Category;
  channel: Channel;
  views: number;
  carts: number;
  orders: number;
  pays: number;
}

export interface OrderRow {
  id: string;
  date: string;
  userId: number;
  category: Category;
  channel: Channel;
  product: string;
  gmv: number;
  refund: number;
  isNew: boolean;
}

export interface DailyPoint {
  date: string;
  gmv: number;
  orders: number;
  refund: number;
}

export interface SliceRow {
  key: string;
  gmv: number;
  orders: number;
  aov: number;
  refundRate: number;
  payRate: number;
}

export interface FunnelTotals {
  views: number;
  carts: number;
  orders: number;
  pays: number;
}

export interface Metrics {
  gmv: number;
  orders: number;
  aov: number;
  refundRate: number;
  refundAmount: number;
  payRate: number;
  newGmvShare: number;
  returningGmvShare: number;
  repeatUserShare: number;
  repeatUsers: number;
  payingUsers: number;
  daily: DailyPoint[];
  byCategory: SliceRow[];
  byChannel: SliceRow[];
  funnel: FunnelTotals;
  prev: {
    gmv: number;
    orders: number;
    refundRate: number;
    aov: number;
  } | null;
}
