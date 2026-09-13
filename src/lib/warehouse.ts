export const WAREHOUSE_SUMMARY = {
  n: 4200,
  sameDay: 0.429,
  scanMiss: 0.034,
  avgDelay: 1.4,
  lanes: [
    {
      lane: "Outbound-North",
      orders: 1162,
      sameDay: 0.371,
      scanMiss: 0.033,
      avgDelay: 1.4,
    },
    {
      lane: "Outbound-South",
      orders: 1019,
      sameDay: 0.242,
      scanMiss: 0.054,
      avgDelay: 2.22,
    },
    {
      lane: "Inbound-A",
      orders: 931,
      sameDay: 0.568,
      scanMiss: 0.024,
      avgDelay: 0.93,
    },
    {
      lane: "Inbound-B",
      orders: 768,
      sameDay: 0.565,
      scanMiss: 0.03,
      avgDelay: 0.97,
    },
    {
      lane: "Returns",
      orders: 320,
      sameDay: 0.506,
      scanMiss: 0.012,
      avgDelay: 1.19,
    },
  ],
} as const;
