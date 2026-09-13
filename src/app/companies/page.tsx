"use client";

import { CompanyDirectory } from "@/components/company-directory";

export default function CompaniesPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-2xl">
        <p className="text-sm text-primary">武汉本地名录</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          先圈目标公司，再一键加进「想投」
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          这不是完整招聘官网，是一份方便起步的本地清单：互联网、办公软件、通信、汽车、医药和信息化都有。岗位以当年公示为准，点「加入想投」后记得改成你真正投的职位名。
        </p>
      </div>
      <CompanyDirectory />
    </div>
  );
}
