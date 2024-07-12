"use server";

import { TimePeriod, userReport } from "@/lib/types/core.types";
import { list } from "@vercel/blob";
import { readJsonFile } from "./file_handler";

export async function listReports() {
  const { blobs } = await list({ prefix: "report/" });
  return blobs;
}

export async function getReportDownloadURL(username: string) {
  const reports = await listReports();
  const report = reports.find((r) => r.pathname === `report/${username}.json`);
  return report?.downloadUrl;
}

export async function getReport(
  username: string,
  period: TimePeriod
): Promise<userReport | null> {
  if (process.env.NODE_ENV === "development") {
    console.log("yo");
    const data = await readJsonFile(`./data/${username}.json`);
    return data.report[period] as userReport;
  }
  const downloadURL = await getReportDownloadURL(username);
  if (!downloadURL) return null;
  const report = await fetch(downloadURL).then((res) => res.json());
  return report.report[period] as userReport;
}
