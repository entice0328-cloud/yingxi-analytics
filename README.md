# 营析

电商经营分析台。给数据分析 / 数据运营 / 商业分析 / BI 实习演示用：看 GMV、转化漏斗、退货和客户结构，并给出可执行结论。

数据是固定种子生成的店铺样本，不是真实商家后台。口径和等价 SQL 在「方法 / SQL」页。

- 在线演示：https://yingxi-analytics.vercel.app
- 代码：https://github.com/entice0328-cloud/yingxi-analytics

## 在自己电脑上跑起来

需要 Node.js 20.9+、Git。

```bash
git clone https://github.com/entice0328-cloud/yingxi-analytics.git
cd yingxi-analytics
npm install
npm run dev
```

浏览器打开 `http://localhost:43145`。停止服务：终端里 `Ctrl + C`。下次只需 `npm run dev`。

- `/` 经营概览
- `/funnel` 转化漏斗
- `/customers` 客户结构
- `/insights` 结论
- `/method` 口径与 SQL

## 网站内容

- 订单：日期、类目（数码配件、家居收纳、个护清洁、食品饮料、运动户外）、渠道（自然搜索、信息流广告、直播、老客复访）、商品、金额、退货金额、是否新客。
- 流量：同一天、同一类目、同一渠道下的浏览、加购、下单、支付人次。
- 经营概览：营业额、订单、客单价、退货率，以及和上一等长时间的环比；营业额折线；类目条形图和明细表。
- 转化漏斗：四步人数和三步转化率。
- 客户结构：新客 / 老客营业额占比，以及筛选期内下过至少两单的用户占比。
- 结论：三条建议会随上面的筛选重算。默认先看近 30 天、全部类目。
- 方法：每一项指标的定义。

## 后端内容

订单和流量由固定种子在程序里生成，不连接公司数据库。页面按日期、类目、渠道汇总营业额、订单、客单价、退货率和漏斗。方法页给出与这些数字相同口径的 SQL。

## 技术栈

Next.js、TypeScript、Recharts、Tailwind CSS、shadcn/ui。
