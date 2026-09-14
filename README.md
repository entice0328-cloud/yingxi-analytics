# 营析

电商经营分析台。给数据分析 / 数据运营 / 商业分析 / BI 实习演示用：看 GMV、转化漏斗、退货和客户结构，并给出三条可执行结论。

数据是固定种子生成的店铺样本，不是真实商家后台。口径和等价 SQL 在「方法 / SQL」页。

## 在自己电脑上跑起来

第一次配环境按这个顺序来，Windows 和 macOS 都一样。

1. 装 **Node.js LTS**（20.9 以上），去 nodejs.org 下载安装包，一路下一步。
2. 装 **Visual Studio Code**，用来看代码和开终端。
3. 装 **Git**，用来把这个仓库拉到本地。
4. 确认装好了：打开终端输入 `node -v` 和 `git --version`，都能打印版本号。

然后把代码拉下来并启动：

```bash
git clone <仓库地址>
cd <仓库目录>
npm install
npm run dev
```

浏览器打开 `http://localhost:43145`。改代码保存后页面会自动刷新。

停止服务：在终端按 `Ctrl + C`。下次只要 `npm run dev`，不用再 `npm install`。

常见问题：
- `npm : 无法将...识别` → Node 没装好，或装完没重开终端。
- `EADDRINUSE`（端口占用）→ 先关掉上一个 `npm run dev`，或改 `package.json` 里的端口。
- 页面白屏 → 看终端报错信息，通常是某个文件存成了错误的编码或语法写坏了。

## 面试演示建议

别只依赖本机。把项目部署成一个网址，现场打开更稳：

1. 代码推到 GitHub。
2. 到 vercel.com 用 GitHub 登录，点 Import，选这个仓库，默认设置直接 Deploy。
3. 拿到一个 `https://xxx.vercel.app` 的地址，写进简历，也可以存在手机里。

再准备一份离线保险：把概览、漏斗、结论三页各截一张图，或用浏览器打印成 PDF。万一现场没网也能讲。

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
