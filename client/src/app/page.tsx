"use client";
import Dropdown from "@/components/dropdown";
import { useEffect, useState } from "react";
import { TimePeriod, userReport } from "@/lib/types/core.types";
import { getReport } from "@/lib/db/db";
import { Report } from "@/app/page_components/report";

export default function Home() {
  const [period, setPeriod] = useState<TimePeriod>("month");
  const [user, setUser] = useState("grote");
  const userDropwdownOptions = [
    { value: "grote", label: "grote" },
    { value: "adam.belis", label: "adam.belis" },
  ];
  const periodDropdownOptions: { value: TimePeriod; label: TimePeriod }[] = [
    { value: "month", label: "month" },
    { value: "week", label: "week" },
    { value: "quarter", label: "quarter" },
  ];

  const [data, setData] = useState<userReport | null>(null);
  useEffect(() => {
    getReport(user, period)
      .then((result) => {
        setData(result);
      })
      .catch((e) => console.error(e));
  }, [user, period]);
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 p-8 md:p-24">
      <div className="mt-8 flex flex-col md:flex-row w-full md:max-w-7xl justify-evenly bg-gray-100 p-4 rounded-md">
        <Dropdown
          options={userDropwdownOptions}
          onChange={(val: string) => setUser(val)}
          defaultValue={user}
          className="flex-1 mx-8 my-2"
        />
        <Dropdown
          onChange={(val: string) => setPeriod(val as TimePeriod)}
          defaultValue={period}
          options={periodDropdownOptions}
          className="flex-1 mx-8 my-2"
        />
      </div>

      {data === null ? (
        <p>Please Wait! We are getting your report</p>
      ) : data === undefined ? (
        <p>Report is not available yet. Please try again</p>
      ) : (
        <Report data={data} period={period} />
      )}
    </main>
  );
}
