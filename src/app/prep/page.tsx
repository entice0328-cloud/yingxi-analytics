"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BULLETS = [
  "独立完成「江城投递」实习投递工作台：用 Next.js + TypeScript 实现投递漏斗看板、本地持久化和武汉公司名录，覆盖想投到 Offer 的全流程。",
  "用领域模型表达招聘状态机（想投 / 已投 / 笔试 / 面试 / Offer / 未过），支持拖拽改阶段、筛选搜索、JSON 导入导出。",
  "针对空状态、加载态和移动端布局做了产品化处理，面试时可现场演示增删改查与数据备份。",
];

const DECISIONS = [
  {
    title: "为什么做本地优先，而不是一上来接数据库？",
    body: "投递记录是隐私数据，求职周要立刻能用。localStorage + JSON 备份足够支撑个人场景，也避免面试时因为没账号演示不了。如果以后要多设备，可以再加后端，状态机不用改。",
  },
  {
    title: "为什么用看板，而不是一张大表格？",
    body: "求职的核心是漏斗。看板让面试官一眼看到你理解「流程」而不只是 CRUD。拖拽改阶段对应真实业务里的状态流转。",
  },
  {
    title: "学校作业项目还要不要写进简历？",
    body: "能讲清需求、你的贡献、遇到的坑，再写。需求丢了、代码也讲不明白，就换成这个能演示的项目。作业当练手可以，当面试主项目风险很大。",
  },
];

export default function PrepPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-2xl">
        <p className="text-sm text-primary">面试话术</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          这个项目怎么写进简历、怎么开口讲
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          简历上放 1–2 个你能现场打开的项目，比堆 5 个说不清的课程作业更有用。下面这段话可以直接改成你的口吻。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>一分钟介绍</CardTitle>
          <CardDescription>STAR：情境 → 任务 → 行动 → 结果</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-7">
          <p>
            <span className="font-medium">情境：</span>
            我下周要在武汉投实习，投递分散在 Boss、实习僧和官网，进度很容易丢。
          </p>
          <p>
            <span className="font-medium">任务：</span>
            我给自己做了一个投递工作台，既解决真实问题，也当作前端作品。
          </p>
          <p>
            <span className="font-medium">行动：</span>
            用 Next.js App Router 和 TypeScript 建模招聘漏斗，看板拖拽改状态，数据本地持久化，并整理了一份武汉公司名录。
          </p>
          <p>
            <span className="font-medium">结果：</span>
            我用它管理投递；面试时可以打开网站，现场加一条记录、拖到「面试」、导出备份。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>简历项目三条</CardTitle>
          <CardDescription>复制后按你的学校/日期微调</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {BULLETS.map((text) => (
            <CopyRow key={text} text={text} />
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-3 md:grid-cols-3">
        {DECISIONS.map((item) => (
          <Card key={item.title} size="sm">
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {item.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CopyRow({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border bg-muted/30 p-3 sm:flex-row sm:items-start">
      <p className="flex-1 text-sm leading-6">{text}</p>
      <Button size="sm" variant="outline" onClick={copy}>
        {copied ? <Check /> : <Copy />}
        {copied ? "已复制" : "复制"}
      </Button>
    </div>
  );
}
