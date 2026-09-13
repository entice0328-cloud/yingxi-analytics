import {
  CATEGORIES,
  CHANNELS,
  type Category,
  type Channel,
  type FunnelRow,
  type OrderRow,
} from "./types";
import { dateShift } from "./dates";

/** Fixed as-of date so demo numbers stay stable across builds. */
export const AS_OF = "2026-09-12";
export const HISTORY_DAYS = 90;

const PRODUCTS: Record<Category, { name: string; price: number }[]> = {
  数码配件: [
    { name: "磁吸充电宝", price: 89 },
    { name: "快充数据线", price: 29 },
    { name: "蓝牙耳机套装", price: 159 },
  ],
  家居收纳: [
    { name: "衣柜分层架", price: 79 },
    { name: "桌面收纳盒", price: 39 },
    { name: "真空压缩袋", price: 49 },
  ],
  个护清洁: [
    { name: "氨基酸洗面乳", price: 59 },
    { name: "洗衣凝珠", price: 69 },
    { name: "身体乳套装", price: 99 },
  ],
  食品饮料: [
    { name: "每日坚果", price: 45 },
    { name: "冷萃咖啡液", price: 62 },
    { name: "即食燕麦杯", price: 36 },
  ],
  运动户外: [
    { name: "瑜伽垫", price: 129 },
    { name: "运动水杯", price: 49 },
    { name: "阻力带套装", price: 89 },
  ],
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, items: readonly T[]) {
  return items[Math.floor(rng() * items.length)]!;
}

function weekdayBoost(iso: string) {
  const day = new Date(`${iso}T00:00:00Z`).getUTCDay();
  if (day === 0 || day === 6) return 1.18;
  if (day === 5) return 1.08;
  return 1;
}

export interface Catalog {
  asOf: string;
  start: string;
  funnel: FunnelRow[];
  orders: OrderRow[];
}

let cached: Catalog | null = null;

export function getCatalog(): Catalog {
  if (cached) return cached;
  cached = buildCatalog();
  return cached;
}

function buildCatalog(): Catalog {
  const rng = mulberry32(20260912);
  const start = dateShift(AS_OF, -(HISTORY_DAYS - 1));
  const funnel: FunnelRow[] = [];
  const funnelIndex = new Map<string, FunnelRow>();
  const orders: OrderRow[] = [];
  const knownUsers: number[] = [];
  let userSeq = 1000;
  let orderSeq = 1;

  const categoryMix: [Category, number][] = [
    ["数码配件", 0.28],
    ["家居收纳", 0.22],
    ["个护清洁", 0.2],
    ["食品饮料", 0.18],
    ["运动户外", 0.12],
  ];
  const channelMix: [Channel, number][] = [
    ["信息流广告", 0.34],
    ["自然搜索", 0.26],
    ["直播", 0.22],
    ["老客复访", 0.18],
  ];

  function roll<T extends string>(table: [T, number][]) {
    let r = rng();
    for (const [key, w] of table) {
      r -= w;
      if (r <= 0) return key;
    }
    return table[table.length - 1]![0];
  }

  for (let i = 0; i < HISTORY_DAYS; i++) {
    const date = dateShift(start, i);
    for (const category of CATEGORIES) {
      for (const channel of CHANNELS) {
        const row: FunnelRow = {
          date,
          category,
          channel,
          views: 0,
          carts: 0,
          orders: 0,
          pays: 0,
        };
        funnel.push(row);
        funnelIndex.set(`${date}|${category}|${channel}`, row);
      }
    }
  }

  for (let i = 0; i < HISTORY_DAYS; i++) {
    const date = dateShift(start, i);
    const baseSessions = Math.round((420 + rng() * 80) * weekdayBoost(date));
    const promo = date.slice(5) === "08-18" || date.slice(5) === "09-09";
    const sessions = promo ? Math.round(baseSessions * 1.55) : baseSessions;

    for (let s = 0; s < sessions; s++) {
      const category = roll(categoryMix);
      const channel = roll(channelMix);
      const row = funnelIndex.get(`${date}|${category}|${channel}`)!;
      row.views += 1;

      let cartP = 0.42;
      let orderP = 0.36;
      let payP = 0.88;
      if (category === "数码配件") {
        cartP = 0.48;
        orderP = 0.2;
      }
      if (category === "食品饮料") orderP = 0.44;
      if (channel === "信息流广告") {
        orderP *= 0.72;
        payP = 0.82;
      }
      if (channel === "老客复访") {
        cartP = 0.58;
        orderP = 0.55;
        payP = 0.94;
      }
      if (channel === "直播" && category === "食品饮料") orderP = 0.52;

      if (rng() > cartP) continue;
      row.carts += 1;
      if (rng() > orderP) continue;
      row.orders += 1;
      if (rng() > payP) continue;
      row.pays += 1;

      const preferNew = rng() < (channel === "老客复访" ? 0.08 : 0.62);
      let userId: number;
      let isNew = false;
      if (preferNew || knownUsers.length < 200) {
        userId = userSeq++;
        knownUsers.push(userId);
        isNew = true;
      } else {
        userId = knownUsers[Math.floor(rng() * knownUsers.length)]!;
      }

      const product = pick(rng, PRODUCTS[category]);
      const qty = rng() < 0.18 ? 2 : 1;
      let gmv = product.price * qty;
      if (channel === "直播") gmv = Math.round(gmv * 0.92);
      let refundP = 0.06;
      if (category === "家居收纳") refundP = 0.19;
      if (category === "个护清洁") refundP = 0.04;
      if (channel === "信息流广告") refundP += 0.03;
      const refund = rng() < refundP ? gmv : 0;

      orders.push({
        id: `O${String(orderSeq++).padStart(5, "0")}`,
        date,
        userId,
        category,
        channel,
        product: product.name,
        gmv,
        refund,
        isNew,
      });
    }
  }

  return { asOf: AS_OF, start, funnel, orders };
}

export { CATEGORIES, CHANNELS };
