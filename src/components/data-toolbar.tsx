"use client";

import { useRef } from "react";
import { Download, RotateCcw, Upload } from "lucide-react";
import { useApplications } from "@/components/applications-provider";
import { Button } from "@/components/ui/button";
import { downloadJson } from "@/lib/storage";
import type { Application } from "@/lib/types";

export function DataToolbar() {
  const { applications, resetDemo, importAll } = useApplications();
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImport(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Application[];
        if (!Array.isArray(parsed)) return;
        importAll(parsed);
      } catch {
        // ignore malformed backup
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          handleImport(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadJson(applications)}
      >
        <Download />
        导出备份
      </Button>
      <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
        <Upload />
        导入 JSON
      </Button>
      <Button variant="ghost" size="sm" onClick={resetDemo}>
        <RotateCcw />
        恢复示例数据
      </Button>
    </div>
  );
}
