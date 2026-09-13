import { ResumeSheet } from "@/components/resume-sheet";
import { computeMetrics } from "@/lib/metrics";

export default function ResumePage() {
  const metrics = computeMetrics({
    range: "90d",
    category: "all",
    channel: "all",
  });
  return <ResumeSheet metrics={metrics} />;
}
