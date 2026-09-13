"use client";

import { useMemo, useState } from "react";
import { ApplicationDialog } from "@/components/application-dialog";
import { useApplications } from "@/components/applications-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WUHAN_COMPANIES } from "@/lib/companies";
import { emptyDraft } from "@/lib/seed";
import type { ApplicationDraft, CompanyProfile } from "@/lib/types";

const TAGS = ["全部", "前端", "Java", "互联网", "网安", "汽车", "半导体"] as const;

export function CompanyDirectory() {
  const { upsert } = useApplications();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<(typeof TAGS)[number]>("全部");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ApplicationDraft | null>(null);

  const list = useMemo(() => {
    return WUHAN_COMPANIES.filter((company) => {
      const hit =
        !query.trim() ||
        `${company.name} ${company.note} ${company.hiring}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
      const tagHit = tag === "全部" || company.tags.includes(tag);
      return hit && tagHit;
    });
  }, [query, tag]);

  function addToWishlist(company: CompanyProfile) {
    setDraft({
      ...emptyDraft(),
      company: company.name,
      district: company.district,
      role: company.hiring.split("/")[0]?.trim() || "开发实习",
      jdHighlights: company.tags.join("、"),
      notes: company.note,
      stage: "wishlist",
    });
    setOpen(true);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Input
          placeholder="搜公司、方向、关键词…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {TAGS.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={tag === item ? "default" : "outline"}
              onClick={() => setTag(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed px-6 py-16 text-center">
          <p className="font-medium">名录里没有匹配结果</p>
          <p className="mt-2 text-sm text-muted-foreground">
            换个标签，或直接在看板里手动新建一家公司。
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {list.map((company) => (
            <Card key={company.name} size="sm">
              <CardHeader>
                <CardTitle>{company.name}</CardTitle>
                <CardDescription>
                  {company.district} · {company.hiring}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1">
                  {company.tags.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {company.note}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addToWishlist(company)}
                >
                  加入想投
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <ApplicationDialog
        open={open}
        onOpenChange={setOpen}
        prefill={draft}
        onSubmit={(next) => upsert(next)}
      />
    </div>
  );
}
