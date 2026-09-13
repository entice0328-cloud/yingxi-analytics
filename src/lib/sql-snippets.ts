export const SQL_SNIPPETS = [
  {
    title: "经营概览：GMV、订单、客单价、退货率",
    sql: `SELECT
  SUM(gmv)                              AS gmv,
  COUNT(*)                              AS orders,
  SUM(gmv) * 1.0 / COUNT(*)             AS aov,
  SUM(refund) * 1.0 / NULLIF(SUM(gmv),0) AS refund_rate
FROM orders
WHERE order_date BETWEEN :start_date AND :end_date
  AND (:category = 'all' OR category = :category)
  AND (:channel  = 'all' OR channel  = :channel);`,
  },
  {
    title: "转化漏斗",
    sql: `SELECT
  SUM(views)  AS views,
  SUM(carts)  AS carts,
  SUM(orders) AS checkout_orders,
  SUM(pays)   AS paid_orders,
  SUM(carts)  * 1.0 / NULLIF(SUM(views),0)  AS view_to_cart,
  SUM(orders) * 1.0 / NULLIF(SUM(carts),0)  AS cart_to_order,
  SUM(pays)   * 1.0 / NULLIF(SUM(orders),0) AS order_to_pay
FROM funnel_daily
WHERE dt BETWEEN :start_date AND :end_date;`,
  },
  {
    title: "类目贡献与退货",
    sql: `SELECT
  category,
  SUM(gmv)    AS gmv,
  SUM(refund) * 1.0 / NULLIF(SUM(gmv),0) AS refund_rate
FROM orders
WHERE order_date BETWEEN :start_date AND :end_date
GROUP BY category
ORDER BY gmv DESC;`,
  },
  {
    title: "新客 / 老客 GMV 结构",
    sql: `SELECT
  CASE WHEN is_new_customer THEN 'new' ELSE 'returning' END AS cohort,
  SUM(gmv) AS gmv,
  SUM(gmv) * 1.0 / SUM(SUM(gmv)) OVER () AS gmv_share
FROM orders
WHERE order_date BETWEEN :start_date AND :end_date
GROUP BY 1;`,
  },
] as const;
