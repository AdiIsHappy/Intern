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

export function getAllPeriodsBeggningsafter(
  period: TimePeriod,
  date: string
): string[] {
  const periods: string[] = [];
  let datObj = DateTime.fromISO(date);
  while (datObj < DateTime.now()) {
    periods.push(datObj.startOf(period).toISO());
    datObj = datObj.plus({ [period]: 1 });
  }
  return periods;
}
