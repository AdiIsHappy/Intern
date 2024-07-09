"use server";
import { PathType, TimePeriod, userReport } from "../types/core.types";
const config = require("../../config.json");
import path from "path";
import { fileExist, readJsonFile } from "./file_handler";

const reportsRoot = config.reportsPath;

export async function getPath(username: string, pathType: PathType) {
  if (pathType === "report") return path.join(reportsRoot, `${username}.json`);
  if (pathType === "user") return path.join(reportsRoot, `${username}`);
  return "";
}

export async function getReport(
  username: string,
  period: TimePeriod
): Promise<userReport> {
  const filePath = await getPath(username, "report");
  if (await fileExist(filePath)) {
    const data = await readJsonFile(filePath);
    return data.report[period] as userReport;
  }
  console.error(`Report for ${username} not found`);
  return {};
}
