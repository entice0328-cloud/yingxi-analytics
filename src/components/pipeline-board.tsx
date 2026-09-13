"use client";

import { useMemo, useState } from "react";
import {
  CalendarClock,
  GripVertical,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { ApplicationDialog } from "@/components/application-dialog";
import { useApplications } from "@/components/applications-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  STAGES,
  STAGE_LABEL,
  type Application,
  type Stage,
} from "@/lib/types";

const COLUMN_HINT: Record<Stage, string> = {
  wishlist: "还没投，先别忘",
  applied: "等笔试 / HR",
  written: "测评进行中",
  interview: "重点准备",
  offer: "对比再决定",
  rejected: "复盘再出发",
};

export function PipelineBoard() {
  const { applications, upsert, move, remove } = useApplications();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return applications;
    return applications.filter((item) =>
      [item.company, item.role, item.district, item.source, item.notes]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [applications, query]);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(item: Application) {
    setEditing(item);
    setOpen(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="搜公司、岗位、笔记…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button onClick={openCreate}>
          <Plus />
          新建投递
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyBoard onCreate={openCreate} hasQuery={Boolean(query.trim())} />
      ) : (
        <div className="grid auto-rows-fr gap-3 overflow-x-auto pb-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {STAGES.map((stage) => {
            const cards = filtered.filter((item) => item.stage === stage);
            return (
              <section
                key={stage}
                className="flex min-h-56 min-w-[240px] flex-col rounded-2xl border bg-card/70 p-2 shadow-sm"
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/plain") || dragging;
                  if (id) move(id, stage);
                  setDragging(null);
                }}
              >
                <header className="flex items-center justify-between px-2 py-1.5">
                  <div>
                    <h2 className="text-sm font-semibold">
                      {STAGE_LABEL[stage]}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {COLUMN_HINT[stage]}
                    </p>
                  </div>
                  <Badge variant="secondary">{cards.length}</Badge>
                </header>
                <div className="flex flex-1 flex-col gap-2">
                  {cards.length === 0 ? (
                    <p className="rounded-xl border border-dashed px-3 py-6 text-center text-xs text-muted-foreground">
                      拖到这里，或点新建
                    </p>
                  ) : (
                    cards.map((item) => (
                      <article
                        key={item.id}
                        draggable
                        onDragStart={(e) => {
                          setDragging(item.id);
                          e.dataTransfer.setData("text/plain", item.id);
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        onDragEnd={() => setDragging(null)}
                        className="cursor-grab rounded-xl border bg-background p-3 shadow-xs active:cursor-grabbing"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {item.company}
                            </p>
                            <p className="truncate text-sm text-muted-foreground">
                              {item.role}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <GripVertical className="size-4 text-muted-foreground/70" />
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={
                                  <Button
                                    size="icon-xs"
                                    variant="ghost"
                                    aria-label="更多"
                                  />
                                }
                              >
                                <MoreHorizontal />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => openEdit(item)}
                                >
                                  编辑
                                </DropdownMenuItem>
                                {STAGES.filter((s) => s !== item.stage).map(
                                  (s) => (
                                    <DropdownMenuItem
                                      key={s}
                                      onClick={() => move(item.id, s)}
                                    >
                                      移到{STAGE_LABEL[s]}
                                    </DropdownMenuItem>
                                  ),
                                )}
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() => remove(item.id)}
                                >
                                  <Trash2 />
                                  删除
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge variant="outline">{item.district}</Badge>
                          <Badge variant="secondary">{item.source}</Badge>
                        </div>
                        {item.nextAction ? (
                          <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                            <CalendarClock className="mt-0.5 size-3.5 shrink-0" />
                            <span>
                              {item.nextAction}
                              {item.nextActionAt
                                ? ` · ${item.nextActionAt}`
                                : ""}
                            </span>
                          </p>
                        ) : null}
                      </article>
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <ApplicationDialog
        open={open}
        onOpenChange={setOpen}
        initial={editing}
        onSubmit={upsert}
      />
    </div>
  );
}

function EmptyBoard({
  onCreate,
  hasQuery,
}: {
  onCreate: () => void;
  hasQuery: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 px-6 py-16 text-center">
      <p className="text-lg font-medium">
        {hasQuery ? "没有匹配的投递" : "看板还是空的"}
      </p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {hasQuery
          ? "换个关键词，或者清空搜索后再看全部进度。"
          : "从「新建投递」开始，或者去武汉名录里把目标公司加进「想投」。数据只存在这台电脑的浏览器里。"}
      </p>
      {!hasQuery ? (
        <Button className="mt-5" onClick={onCreate}>
          <Plus />
          写下第一家公司
        </Button>
      ) : null}
    </div>
  );
}
