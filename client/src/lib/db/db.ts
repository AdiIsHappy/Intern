"use server";

import { TimePeriod, userReport } from "@/lib/types/core.types";
import { list } from "@vercel/blob";

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

  const downloadURL = await getReportDownloadURL(username);
  if (!downloadURL) return null;
  const report = await fetch(downloadURL).then((res) => res.json());
  return report.report[period] as userReport;
}

export async function getAvailablePeriods(username: string): Promise<string[]> {
  const url = await getReportDownloadURL(username);
  if (!url) return [];
  const report = await fetch(url).then((res) => res.json());
  const periods = Object.keys(report.report);
  return periods;
}
