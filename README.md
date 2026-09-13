# 营析

电商经营分析台。给数据分析 / 数据运营 / 商业分析 / BI 实习演示用：看 GMV、转化漏斗、退货和客户结构，并给出三条可执行结论。

数据是固定种子生成的店铺样本，不是真实商家后台。口径和等价 SQL 在「方法 / SQL」页。

## 本地运行

需要 Node.js 20+。

```bash
npm install
npm run dev
```

浏览器打开终端提示的地址（默认 `http://127.0.0.1:43145`）。

- `/` 经营概览
- `/funnel` 转化漏斗
- `/customers` 客户结构
- `/insights` 结论
- `/method` 口径与 SQL
- `/resume` 一页纸简历（可打印成 PDF）

简历 Markdown 也在 `resume/张力元-数据分析实习生.md`。Word 版在 `resume/张力元-数据分析实习生.docx`。网页版在 `/resume`。

## 简历项目可以怎么写

独立完成电商经营分析台：用 SQL 口径计算 GMV、客单价、退货率与漏斗，按类目和渠道切片，针对退货、加购流失和复购给出运营建议。面试可打开网页筛选并讲结论。

## 技术栈

Next.js、TypeScript、Recharts、Tailwind CSS、shadcn/ui。
