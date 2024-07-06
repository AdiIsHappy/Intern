import { TimePeriod } from "../types/core.types";
const { DateTime } = require("luxon");
const config = require("../config.json");

export function getNPeriodBeforeDate(period: TimePeriod): string {
  const now = DateTime.now();
  const n = config.analysis.period[period] || 4;
  const startOfPeriod = now.startOf(period);
  const dateNPeriodsBefore = startOfPeriod.minus({ [period]: n });
  return dateNPeriodsBefore.toISO();
}
