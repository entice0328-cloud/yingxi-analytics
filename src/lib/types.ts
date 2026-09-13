export const STAGES = [
  "wishlist",
  "applied",
  "written",
  "interview",
  "offer",
  "rejected",
] as const;

export type Stage = (typeof STAGES)[number];

export const STAGE_LABEL: Record<Stage, string> = {
  wishlist: "想投",
  applied: "已投",
  written: "笔试",
  interview: "面试",
  offer: "Offer",
  rejected: "未过",
};

export const SOURCES = [
  "Boss 直聘",
  "实习僧",
  "智联招聘",
  "前程无忧",
  "公司官网",
  "学校双选会",
  "内推",
  "小红书 / 牛客",
] as const;

export type Source = (typeof SOURCES)[number] | string;

export type District =
  | "光谷 / 东湖高新"
  | "武昌"
  | "汉口 / 江汉"
  | "汉阳 / 沌口"
  | "远程 / 可协商";

export interface Application {
  id: string;
  company: string;
  role: string;
  district: District;
  source: string;
  stage: Stage;
  salary: string;
  appliedAt: string;
  nextAction: string;
  nextActionAt: string;
  jdHighlights: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyProfile {
  name: string;
  district: District;
  tags: string[];
  hiring: string;
  note: string;
}

export type ApplicationDraft = Omit<
  Application,
  "id" | "createdAt" | "updatedAt"
>;
