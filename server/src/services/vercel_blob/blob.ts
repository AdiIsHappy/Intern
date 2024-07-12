import { list, put } from "@vercel/blob";
import { config } from "dotenv";
import { DateTime } from "luxon";
import { TimePeriod } from "../../types/core.types";
const configData = require("../../config.json");

config();

export async function uploadUserDataToBlob(username: string, data: any) {
  const period: TimePeriod = configData.analysis.reportUpdatePeriod;
  const maxAge = DateTime.now()
    .plus({ [period]: 1 })
    .diffNow()
    .as("seconds");

  const res = await put(`report/${username}.json`, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    cacheControlMaxAge: maxAge,
  });
  return res;
}

export async function listReports() {
  const { blobs } = await list({ prefix: "report/" });
  return blobs;
}
