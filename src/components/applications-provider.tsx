"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { createSeedApplications } from "@/lib/seed";
import { loadApplications, saveApplications } from "@/lib/storage";
import type { Application, ApplicationDraft, Stage } from "@/lib/types";

const SERVER_SNAPSHOT: Application[] = [];
let memory: Application[] | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (memory === null) {
    const stored = loadApplications();
    memory = stored && stored.length ? stored : createSeedApplications();
  }
  return memory;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

function setAll(next: Application[]) {
  memory = next;
  saveApplications(next);
  emit();
}

function stamp(draft: ApplicationDraft, existing?: Application): Application {
  const now = new Date().toISOString();
  return {
    ...draft,
    id: existing?.id ?? crypto.randomUUID(),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

interface Store {
  ready: boolean;
  applications: Application[];
  upsert: (draft: ApplicationDraft, id?: string) => void;
  move: (id: string, stage: Stage) => void;
  remove: (id: string) => void;
  resetDemo: () => void;
  clearAll: () => void;
  importAll: (apps: Application[]) => void;
}

const StoreContext = createContext<Store | null>(null);

export function ApplicationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const applications = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const ready = applications !== SERVER_SNAPSHOT;

  const upsert = useCallback((draft: ApplicationDraft, id?: string) => {
    const current = getSnapshot();
    if (id) {
      setAll(
        current.map((item) => (item.id === id ? stamp(draft, item) : item)),
      );
      return;
    }
    setAll([stamp(draft), ...current]);
  }, []);

  const move = useCallback((id: string, stage: Stage) => {
    const now = new Date().toISOString();
    setAll(
      getSnapshot().map((item) =>
        item.id === id
          ? {
              ...item,
              stage,
              appliedAt:
                stage !== "wishlist" && !item.appliedAt
                  ? now.slice(0, 10)
                  : item.appliedAt,
              updatedAt: now,
            }
          : item,
      ),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setAll(getSnapshot().filter((item) => item.id !== id));
  }, []);

  const resetDemo = useCallback(() => {
    setAll(createSeedApplications());
  }, []);

  const clearAll = useCallback(() => {
    setAll([]);
  }, []);

  const importAll = useCallback((apps: Application[]) => {
    setAll(apps);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      applications,
      upsert,
      move,
      remove,
      resetDemo,
      clearAll,
      importAll,
    }),
    [ready, applications, upsert, move, remove, resetDemo, clearAll, importAll],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useApplications() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useApplications must be used inside ApplicationsProvider");
  }
  return ctx;
}
