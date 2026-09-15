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

## 技术栈

Next.js、TypeScript、Recharts、Tailwind CSS、shadcn/ui。
