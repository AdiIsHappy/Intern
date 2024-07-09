"use client";

import { getReport } from "@/lib/db/db";
import { TimePeriod, userReport } from "@/lib/types/core.types";
import { useEffect, useState } from "react";

export interface ReportProps {
  username: string;
  period: TimePeriod;
}

export function Report({ username, period }: ReportProps) {
  const [data, setdata] = useState<userReport>({});
  useEffect(() => {
    getReport(username, period).then((data) => setdata(data));
  }, [username, period]);
  return (
    <div className="w-full h-full bg-green-400">{JSON.stringify(data)}</div>
  );
}
