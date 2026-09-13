import { PrintButton } from "@/components/print-button";
import { pct, yuan } from "@/lib/format";
import type { Metrics } from "@/lib/types";

export function ResumeSheet({
  metrics,
}: {
  metrics: Metrics;
}) {

  return (
    <div className="mx-auto flex w-full max-w-[210mm] flex-col gap-4 px-4 py-6 print:max-w-none print:px-0 print:py-0">
      <div className="flex items-center justify-between print:hidden">
        <p className="text-sm text-muted-foreground">
          投递用一页纸简历，数字与营析看板近 90 天口径一致。
        </p>
        <PrintButton />
      </div>
      <article className="rounded-2xl border bg-white p-8 text-[13.5px] leading-6 text-zinc-800 shadow-sm print:rounded-none print:border-0 print:p-0 print:shadow-none">
        <header className="border-b border-zinc-200 pb-4">
          <h1 className="text-3xl font-semibold tracking-tight">张力元</h1>
          <p className="mt-1 text-sm text-zinc-600">
            数据分析实习生 · 数据运营 / 商业分析 / BI · 求职城市：武汉
          </p>
          <p className="mt-2 text-sm">
            15752886130　entice0328@gmail.com　作品：本仓库「营析」经营分析台
          </p>
        </header>

        <Section title="求职意向">
          数据分析实习生、数据运营、商业分析、BI。可立即到武汉实习，接受数据取数、看板、周报与业务复盘。
        </Section>

        <Section title="教育背景">
          <p className="font-medium">
            Asia Pacific University of Technology &amp; Innovation（APU）
          </p>
          <p>
            Bachelor of Computer Science (Data Analytics)　2025 – 至今　本科二年级
          </p>
          <p className="text-zinc-600">
            课程覆盖 SQL / 数据库、Python、统计分析与可视化，项目以业务取数和经营分析为主。
          </p>
        </Section>

        <Section title="技能">
          <p>
            <span className="font-medium">取数与仓库：</span>
            SQL、MySQL、关系建模、多表聚合、条件筛选
          </p>
          <p>
            <span className="font-medium">分析：</span>
            Python、R、描述统计、对比 / 漏斗 / 结构分析
          </p>
          <p>
            <span className="font-medium">呈现：</span>
            Power BI、经营看板、指标口径说明
          </p>
        </Section>

        <Section title="项目经历">
          <p className="font-medium">
            营析 · 电商经营分析台　SQL 口径 · Python/TS 聚合 · 经营看板
          </p>
          <p className="text-zinc-600">
            独立完成可演示的经营分析作品。用固定种子生成 90 天店铺样本（截至 2026-09-12），在看板中计算 GMV、客单价、退货率、转化漏斗与新老客结构，并给出可执行结论。
          </p>
          <ul className="mt-1 list-disc pl-5">
            <li>
              近 90 天样本：GMV {yuan(metrics.gmv)}，订单{" "}
              {metrics.orders.toLocaleString("zh-CN")}，客单价 {yuan(metrics.aov)}
              ，退货率 {pct(metrics.refundRate)}，浏览→支付 {pct(metrics.payRate)}。
            </li>
            <li>
              按类目拆退货：家居收纳退货显著高于均值，建议先改详情页预期和质检，而不是继续放量。
            </li>
            <li>
              漏斗显示加购→下单是最大流失；信息流广告转化低于老客复访，建议把预算转向验证过的渠道。
            </li>
            <li>
              老客贡献 {pct(metrics.returningGmvShare)} GMV，复购用户占付款用户{" "}
              {pct(metrics.repeatUserShare)}。建议把部分拉新券改为复购激励。
            </li>
          </ul>

          <p className="mt-3 font-medium">
            航空票务管理与查询系统　MySQL · 数据库设计 · SQL
          </p>
          <p className="text-zinc-600">
            课程项目。按出票流程梳理航班、乘客、订单实体，完成关系型库表设计，并用 SQL 做班期筛选、客票检索与聚合统计，验证约束与查询逻辑。
          </p>
          <ul className="mt-1 list-disc pl-5">
            <li>把票务流程落成可查询的表结构，而不是只画概念图。</li>
            <li>编写筛选、排序、条件与聚合查询，覆盖常见客服取数场景。</li>
            <li>用测试数据检查关联查询与空结果，避免「能建表不能回答问题」。</li>
          </ul>
        </Section>

        <Section title="个人评价">
          能把业务问题拆成指标和 SQL，再写成运营听得懂的结论。希望在武汉的数据运营 / BI
          团队里做取数、看板和复盘，而不是只交分析作业。
        </Section>
      </article>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4">
      <h2 className="mb-1 text-sm font-semibold tracking-wide text-zinc-900">
        {title}
      </h2>
      <div className="space-y-1">{children}</div>
    </section>
  );
}
