"use client";

import Link from "next/link";
import { PrintButton } from "@/components/print-button";

export function LiewResumeSheet() {
  return (
    <div className="mx-auto flex w-full max-w-[210mm] flex-col gap-4 px-4 py-6 print:max-w-none print:px-0 print:py-0">
      <div className="flex flex-col gap-3 print:hidden sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            这是朋友 Liew Zhen Yu 的英文简历网页版。Word 在部分环境打不开，用这里预览或打印成 PDF。
          </p>
          <Link href="/liew/project" className="text-sm text-primary underline-offset-4 hover:underline">
            打开他的项目：Warehouse Flow Analytics →
          </Link>
        </div>
        <PrintButton />
      </div>
      <article className="rounded-2xl border bg-white p-8 text-[13.5px] leading-6 text-zinc-800 shadow-sm print:rounded-none print:border-0 print:p-0 print:shadow-none">
        <header className="border-b border-zinc-200 pb-4">
          <h1 className="text-3xl font-semibold tracking-tight">Liew Zhen Yu</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Data Analytics Intern · Kuala Lumpur
          </p>
          <p className="mt-2 text-sm">
            +60 19-686 8629 · dennis.liew03@gmail.com · GitHub / LinkedIn: add when ready
          </p>
        </header>

        <h2 className="mt-4 text-sm font-semibold tracking-wide">Summary</h2>
        <p>
          Computer Science (Data Analytics) student at Asia Pacific University, with a diploma from PSB Academy and part-time logistics operations experience at DHL Supply Chain in Singapore. Seeking a data analytics or operations-analytics internship in Malaysia. Languages: English, Malay, Mandarin, Cantonese.
        </p>

        <h2 className="mt-4 text-sm font-semibold tracking-wide">Education</h2>
        <p className="font-medium">
          Asia Pacific University of Technology &amp; Innovation (APU) · Kuala Lumpur
        </p>
        <p>Bachelor of Science in Computer Science, specialising in Data Analytics · 2025 – Present</p>
        <p className="mt-2 font-medium">PSB Academy · Singapore</p>
        <p>Diploma in InfoComm Technology · 2023 – 2024</p>

        <h2 className="mt-4 text-sm font-semibold tracking-wide">Projects</h2>
        <p className="font-medium">Warehouse Flow Analytics · Python · personal portfolio</p>
        <p className="text-zinc-600">
          Built a reproducible sample of 4,200 warehouse orders and compared lanes on same-day completion, scan-misses, and delay. Synthetic data (fixed seed), not employer data.
        </p>
        <ul className="mt-1 list-disc pl-5">
          <li>Overall same-day completion 42.9%; scan-miss 3.4%; average delay 1.40 hours.</li>
          <li>Outbound-South: scan-miss 5.4% and delay 2.22 hours, versus Inbound-A at 2.4% and 0.93 hours.</li>
          <li>Recommended holding volume in Outbound-South until scan compliance and staffing are fixed.</li>
        </ul>

        <h2 className="mt-4 text-sm font-semibold tracking-wide">Experience</h2>
        <p className="font-medium">
          Logistic Assistant (Part-time) · DHL Supply Chain · Singapore · 2022 – 2025
        </p>
        <p className="text-zinc-600">Confirm part-time/full-time and end date before sending.</p>
        <ul className="mt-1 list-disc pl-5">
          <li>Supported inbound and outbound warehouse tasks in a live DHL operation, following standard handling procedures.</li>
          <li>Processed orders with attention to scan accuracy and on-time movement, not speed alone.</li>
          <li>Coordinated with teammates to clear daily work in a time-critical environment.</li>
        </ul>
        <p className="mt-2 font-medium">
          Office Housekeeping · Excelgenic Sdn Bhd · Johor Bahru · 2019 – 2022
        </p>
        <p>Kept office facilities in order and completed daily tasks independently.</p>

        <h2 className="mt-4 text-sm font-semibold tracking-wide">Skills</h2>
        <p>Analysis: Microsoft Excel, SAS, data preprocessing, descriptive analysis</p>
        <p>Academic tools: SQL, Python (coursework in the Data Analytics programme)</p>
        <p>Languages: English, Malay, Mandarin, Cantonese</p>
        <p className="mt-3 italic text-zinc-600">References available upon request.</p>
      </article>
    </div>
  );
}
