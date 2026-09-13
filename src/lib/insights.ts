import type { Metrics } from "./types";
import { pct, yuan } from "./format";

export interface Insight {
  id: string;
  title: string;
  finding: string;
  action: string;
  severity: "high" | "mid" | "good";
}

export function buildInsights(m: Metrics): Insight[] {
  const home = m.byCategory.find((r) => r.key === "家居收纳");
  const digital = m.byCategory.find((r) => r.key === "数码配件");
  const care = m.byCategory.find((r) => r.key === "个护清洁");
  const ads = m.byChannel.find((r) => r.key === "信息流广告");
  const returnCh = m.byChannel.find((r) => r.key === "老客复访");
  const avgRefund =
    m.byCategory.reduce((s, r) => s + r.refundRate, 0) /
    Math.max(m.byCategory.length, 1);

  const cartRate = m.funnel.views ? m.funnel.carts / m.funnel.views : 0;
  const orderRate = m.funnel.carts ? m.funnel.orders / m.funnel.carts : 0;
  const payRate = m.funnel.orders ? m.funnel.pays / m.funnel.orders : 0;

  const refundInsight: Insight = home
    ? {
        id: "refund",
        title: "家居收纳在赚钱，也在把货退回来",
        finding: `家居收纳退货率 ${pct(home.refundRate)}，高于类目均值 ${pct(avgRefund)}。GMV 仍有 ${yuan(home.gmv)}，水分不小。`,
        action:
          "优先抽检分层架和压缩袋：核对详情页尺寸图、包装破损和「看起来很大」的预期差。退货降 4 个点，这类目利润会比再砸一波广告更明显。",
        severity: "high",
      }
    : {
        id: "refund",
        title: "退货率需要单独看类目",
        finding: `整体退货率 ${pct(m.refundRate)}，不要只看 GMV。`,
        action: "按类目拆退货原因，先处理占比高且退货贵的 SKU。",
        severity: "mid",
      };

  const funnelInsight: Insight = {
    id: "funnel",
    title: "漏斗不是败在浏览，而是败在加购之后",
    finding: `浏览→加购 ${pct(cartRate)}，加购→下单只有 ${pct(orderRate)}，下单→支付 ${pct(payRate)}。${
      digital
        ? `数码配件支付转化 ${pct(digital.payRate)}，浏览多、成交少。`
        : ""
    }${
      ads && returnCh
        ? `信息流广告支付转化 ${pct(ads.payRate)}，老客复访 ${pct(returnCh.payRate)}。`
        : ""
    }`,
    action:
      "先改加购后路径：运费、凑单门槛、库存显示。信息流素材不要再往低转化 SKU 堆量；直播和自然搜索更值得加预算。",
    severity: "high",
  };

  const repeatInsight: Insight = {
    id: "repeat",
    title: "新客把场子撑大，老客把钱留下",
    finding: `复购用户占付款用户 ${pct(m.repeatUserShare)}，老客贡献 ${pct(m.returningGmvShare)} 的 GMV。新客 GMV 占比 ${pct(m.newGmvShare)}。${
      care
        ? `个护清洁退货率 ${pct(care.refundRate)}，更适合做复购。`
        : ""
    }`,
    action:
      "把一部分拉新券改成复购券和个护清洁补货提醒。新客预算只留给已经验证能转化的渠道，而不是全店铺开。",
    severity: "good",
  };

  return [refundInsight, funnelInsight, repeatInsight];
}
