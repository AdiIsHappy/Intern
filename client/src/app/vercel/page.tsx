import { TimePeriod, userReport } from "@/lib/types/core.types";
import { list } from "@vercel/blob";

export default async function Page() {
  const response = await list();
  console.log(response);
  return (
    <>
      {response.blobs.map((blob) => (
        <a key={blob.pathname} href={blob.downloadUrl}>
          {blob.pathname}
        </a>
      ))}
    </>
  );
}

export async function listReports() {
  const { blobs } = await list();
  return blobs;
}

export async function getReportDownloadURL(username: string) {
  const reports = await listReports();
  const report = reports.find((r) => r.pathname === `${username}.json`);
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
