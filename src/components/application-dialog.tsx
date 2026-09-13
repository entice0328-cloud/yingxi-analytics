"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { emptyDraft } from "@/lib/seed";
import {
  SOURCES,
  STAGES,
  STAGE_LABEL,
  type Application,
  type ApplicationDraft,
  type District,
  type Stage,
} from "@/lib/types";

const DISTRICTS: District[] = [
  "光谷 / 东湖高新",
  "武昌",
  "汉口 / 江汉",
  "汉阳 / 沌口",
  "远程 / 可协商",
];

export function ApplicationDialog({
  open,
  onOpenChange,
  initial,
  prefill,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Application | null;
  prefill?: ApplicationDraft | null;
  onSubmit: (draft: ApplicationDraft, id?: string) => void;
}) {
  const [draft, setDraft] = useState<ApplicationDraft>(emptyDraft());

  function syncOpen(next: boolean) {
    if (next) {
      if (initial) {
        const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = initial;
        void _id;
        void _c;
        void _u;
        setDraft(rest);
      } else {
        setDraft(prefill ?? emptyDraft());
      }
    }
    onOpenChange(next);
  }

  function update<K extends keyof ApplicationDraft>(
    key: K,
    value: ApplicationDraft[K],
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!draft.company.trim() || !draft.role.trim()) return;
    onSubmit(draft, initial?.id);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={syncOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? "编辑投递" : "新建投递"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="company">公司</Label>
            <Input
              id="company"
              value={draft.company}
              placeholder="例如：金山办公 WPS"
              onChange={(e) => update("company", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">岗位</Label>
            <Input
              id="role"
              value={draft.role}
              placeholder="前端开发实习"
              onChange={(e) => update("role", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>阶段</Label>
              <Select
                value={draft.stage}
                onValueChange={(v) => update("stage", v as Stage)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {STAGE_LABEL[stage]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>城区</Label>
              <Select
                value={draft.district}
                onValueChange={(v) => update("district", v as District)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>来源</Label>
              <Select
                value={draft.source}
                onValueChange={(v) => update("source", v ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SOURCES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="salary">日薪 / 月薪</Label>
              <Input
                id="salary"
                value={draft.salary}
                placeholder="250/天"
                onChange={(e) => update("salary", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="appliedAt">投递日期</Label>
              <Input
                id="appliedAt"
                type="date"
                value={draft.appliedAt}
                onChange={(e) => update("appliedAt", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nextActionAt">下一步截止日期</Label>
              <Input
                id="nextActionAt"
                type="date"
                value={draft.nextActionAt}
                onChange={(e) => update("nextActionAt", e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nextAction">下一步动作</Label>
            <Input
              id="nextAction"
              value={draft.nextAction}
              placeholder="跟进 HR / 准备二面演示"
              onChange={(e) => update("nextAction", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jd">JD 关键词</Label>
            <Input
              id="jd"
              value={draft.jdHighlights}
              placeholder="React、TypeScript、状态管理"
              onChange={(e) => update("jdHighlights", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">笔记</Label>
            <Textarea
              id="notes"
              rows={4}
              value={draft.notes}
              placeholder="面试官名字、题型、需要补的项目点"
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
