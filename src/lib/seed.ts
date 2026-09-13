import type { Application } from "./types";

function isoDaysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function createSeedApplications(): Application[] {
  const now = new Date().toISOString();
  return [
    {
      id: "seed-wps",
      company: "金山办公 WPS",
      role: "前端开发实习",
      district: "光谷 / 东湖高新",
      source: "实习僧",
      stage: "interview",
      salary: "250/天",
      appliedAt: isoDaysFromNow(-9),
      nextAction: "准备项目演示：看板拖拽 + localStorage 同步",
      nextActionAt: isoDaysFromNow(2),
      jdHighlights: "React、TypeScript、协作文档体验、列表性能",
      notes: "二面可能让现场讲这个投递工作台。把三个技术决策背熟。",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "seed-douyu",
      company: "斗鱼",
      role: "Web 前端实习",
      district: "光谷 / 东湖高新",
      source: "Boss 直聘",
      stage: "applied",
      salary: "200-250/天",
      appliedAt: isoDaysFromNow(-3),
      nextAction: "跟进 HR，补充作品在线链接",
      nextActionAt: isoDaysFromNow(1),
      jdHighlights: "直播中台、活动页、React",
      notes: "已投简历，等待笔试通知。",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "seed-sf",
      company: "顺丰科技（武汉）",
      role: "Java 开发实习",
      district: "光谷 / 东湖高新",
      source: "公司官网",
      stage: "wishlist",
      salary: "",
      appliedAt: "",
      nextAction: "改一版偏后端的简历，强调状态机与接口设计",
      nextActionAt: isoDaysFromNow(0),
      jdHighlights: "Spring、运单状态、高并发",
      notes: "想投。先把项目里的 Stage 状态流转讲成领域模型。",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "seed-hik",
      company: "海康威视（武汉）",
      role: "前端开发实习",
      district: "光谷 / 东湖高新",
      source: "智联招聘",
      stage: "written",
      salary: "220/天",
      appliedAt: isoDaysFromNow(-6),
      nextAction: "完成在线测评，复盘错题",
      nextActionAt: isoDaysFromNow(0),
      jdHighlights: "Vue/React、可视化、安防业务",
      notes: "笔试链接已发，先做题再更新状态。",
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export function emptyDraft(): Omit<Application, "id" | "createdAt" | "updatedAt"> {
  return {
    company: "",
    role: "前端开发实习",
    district: "光谷 / 东湖高新",
    source: "Boss 直聘",
    stage: "wishlist",
    salary: "",
    appliedAt: "",
    nextAction: "",
    nextActionAt: "",
    jdHighlights: "",
    notes: "",
  };
}
