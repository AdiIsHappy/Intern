"use server";
import { PathType, TimePeriod, userReport } from "../types/core.types";
import config from "../../config.json";
import path from "path";
import { fileExist, readJsonFile } from "./file_handler";
import adam_belis from "@/../data/adam.belis.json";
import grote from "@/../data/grote.json";

console.log(adam_belis);

const reportsRoot = config.reportsPath;

export async function getPath(username: string, pathType: PathType) {
  if (pathType === "report") {
    let basePath = process.cwd();
    if (process.env.NODE_ENV === "production") {
      basePath = path.join(process.cwd(), ".next/server/chunks");
    }
    return path.join(basePath, "data", `${username}.json`);
  }
  if (pathType === "user")
    return path.join(process.cwd(), reportsRoot, `${username}`);
  return "";
}

export async function getReport(
  username: string,
  period: TimePeriod
): Promise<userReport | null> {
  if (username === "adam.belis") return adam_belis.report[period] as userReport;
  if (username === "grote") return grote.report[period] as userReport;
  return null;
  // const filePath = await getPath(username, "report");
  // if (await fileExist(filePath)) {
  //   const data = await readJsonFile(filePath);
  //   return data.report[period] as userReport;
  // }
  // console.error(`Report for ${username} not found`);
  // return null;
}
