"use client";
import Dropdown from "@/components/dropdown";
import { useEffect, useState } from "react";
import { TimePeriod, userReport } from "@/lib/types/core.types";
import { getAvailableReportsList, getReport } from "@/lib/db/db";
import { Report } from "@/app/page_components/report";
import Skeleton from "react-loading-skeleton";
import { Navbar } from "./page_components/navbar";

const UserInfo = {
  username: "Torsten Grote",
  name: "Torsten Grote",
  email: "chaos.social/@grote",
  profilePic:
    "https://gitlab.com/uploads/-/system/user/avatar/26331/grote_1_256x256.jpg",
  teamMembers: [
    { name: "Torsten Grote", username: "grote" },
    { name: "Charles Schlosser", username: "chuckyschluz" },
    { name: "Adam Belis", username: "adam.belis" },
  ],
};

export default function MergeRequestAssessment() {
  const [period, setPeriod] = useState<TimePeriod>("month");
  const [user, setUser] = useState<string | null>(null);
  const [data, setData] = useState<userReport | null>(null);

  const [userDropwdownOptions, setUserDropwdownOptions] = useState<
    { value: string; label: string }[] | null
  >(null);

  const periodDropdownOptions: { value: TimePeriod; label: string }[] = [
    { value: "month", label: "last 4 months" },
    { value: "week", label: "last 6 weeks" },
    { value: "quarter", label: "last 2 quarter" },
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

  return (
    <main className="pt-12 flex flex-col justify-center items-center">
      <Navbar
        onUserSelect={(user: string) => {
          setUser(user);
          setData(null);
        }}
        email={UserInfo.email}
        name={UserInfo.name}
        profilePic={UserInfo.profilePic}
        teamMembers={
          userDropwdownOptions?.map((val) => ({
            name: val.value,
            username: val.value,
          })) || []
        }
      />
      {user ? (
        <Dropdown
          label="Period"
          onChange={(val: string) => setPeriod(val as TimePeriod)}
          defaultValue={period}
          options={periodDropdownOptions}
          className="flex-1 mx-8 my-2"
        />
      ) : (
        <Skeleton containerClassName="flex-1 mx-8 my-2 w-1/2" height={40} />
      )}

      {data === undefined ? (
        <p>Report is not available yet. Please try again</p>
      ) : (
        <Report data={data} period={period} />
      )}
    </main>
  );
}
