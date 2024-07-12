"use client";
import Dropdown from "@/components/dropdown";
import { useEffect, useState } from "react";
import { TimePeriod, userReport } from "@/lib/types/core.types";
import { getAvailableReportsList, getReport } from "@/lib/db/db";
import { Report } from "@/app/page_components/report";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  const [period, setPeriod] = useState<TimePeriod>("month");
  const [user, setUser] = useState<string | null>(null);
  const [data, setData] = useState<userReport | null>(null);

  const [userDropwdownOptions, setUserDropwdownOptions] = useState<
    { value: string; label: string }[] | null
  >(null);

  const periodDropdownOptions: { value: TimePeriod; label: TimePeriod }[] = [
    { value: "month", label: "month" },
    { value: "week", label: "week" },
    { value: "quarter", label: "quarter" },
  ];

  useEffect(() => {
    if (user === null) {
      setData(null);
      return;
    }
    getReport(user, period)
      .then((result) => {
        setData(result);
      })
      .catch((e) => console.error(e));
  }, [user, period]);

  useEffect(() => {
    getAvailableReportsList().then((result: string[]) => {
      const options = result.map((val) => ({ value: val, label: val }));
      setUserDropwdownOptions(options);
      if (options.length > 0) {
        setUser(options[0].value);
      }
    });
  }, []);

  console.log(user);

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 p-8 md:p-24">
      <div className="mt-8 flex flex-col md:flex-row w-full md:max-w-7xl justify-evenly bg-gray-100 p-4 rounded-md">
        {userDropwdownOptions && user ? (
          <Dropdown
            options={userDropwdownOptions}
            onChange={(val: string) => {
              setUser(val);
              setData(null);
            }}
            defaultValue={user}
            className="flex-1 mx-8 my-2"
          />
        ) : (
          <Skeleton containerClassName="flex-1 mx-8 my-2" height={40} />
        )}
        {userDropwdownOptions && user ? (
          <Dropdown
            onChange={(val: string) => setPeriod(val as TimePeriod)}
            defaultValue={period}
            options={periodDropdownOptions}
            className="flex-1 mx-8 my-2"
          />
        ) : (
          <Skeleton containerClassName="flex-1 mx-8 my-2" height={40} />
        )}
      </div>

      {data === undefined ? (
        <p>Report is not available yet. Please try again</p>
      ) : (
        <Report data={data} period={period} />
      )}
    </main>
  );
}
