"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Dropdown from "@/components/dropdown";
import { Navbar } from "@/app/page_components/sections/navbar";
import { Report } from "@/app/page_components/report";
import { getAvailablePeriods, getReport } from "@/lib/db/db";
import { TimePeriod, userReport, User } from "@/lib/types/core.types";
import { getAllUsersUnderUsername, getUserByUsername } from "@/lib/db/pg";
import { ReportSkeleton } from "@/components/report_skeleton";

const authenticatedUsername = "grote";

const periodLabels = {
  month: "Last 3 Month",
  week: "Last 4 Week",
  quarter: "Last 2 Quarter",
};

export default function MergeRequestAssessment() {
  const [period, setPeriod] = useState<TimePeriod | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
  const [data, setData] = useState<userReport | null>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);

  const [periodDropdownOptions, setPeriodDropdownOptions] = useState<
    { value: TimePeriod; label: string }[] | null
  >(null);

  useEffect(() => {
    const fetchAuthenticatedUserData = async () => {
      try {
        const user = await getUserByUsername(authenticatedUsername);
        setAuthenticatedUser(user);
        const members = await getAllUsersUnderUsername(authenticatedUsername);
        setTeamMembers(members);
        setSelectedUser(members[0].username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthenticatedUserData();
  }, []);

  useEffect(() => {
    if (selectedUser === null) {
      setData(null);
      return;
    }
    const fetchReportData = async () => {
      try {
        const availablePeriods = await getAvailablePeriods(selectedUser);
        if (availablePeriods.length === 0) return;
        setPeriodDropdownOptions(
          availablePeriods.map((p) => ({
            value: p as TimePeriod,
            label: periodLabels[p as TimePeriod],
          }))
        );

        if (period === null) setPeriod(availablePeriods[0] as TimePeriod);
        if (period === null) return;
        const result = await getReport(selectedUser, period);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReportData();
  }, [selectedUser, period]);

  return (
    <main className=" pt-14 flex flex-col justify-center items-center">
      {authenticatedUser ? (
        <Navbar
          onUserSelect={(user: string) => {
            setSelectedUser(user);
            setData(null);
            setPeriod(null);
            setPeriodDropdownOptions(null);
          }}
          username={authenticatedUser.username}
          name={authenticatedUser.name}
          profilePic={authenticatedUser.profile_pic_url}
          teamMembers={teamMembers.map((member) => ({
            name: member.name,
            username: member.username,
            avatarUrl: member.profile_pic_url,
          }))}
          className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md "
          activeUser={selectedUser}
        />
      ) : (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md  flex items-center justify-between px-4 py-1">
          <Skeleton height={30} width={160} className="mx-4" />
          <Skeleton height={40} width={40} className="mx-4" />
        </div>
      )}

      {!periodDropdownOptions || !period ? (
        <Skeleton containerClassName="flex-1 mx-8 my-2 w-1/4" height={40} />
      ) : (
        <Dropdown
          label="Period"
          onChange={(val: string) => {
            setPeriod(val as TimePeriod);
            setData(null);
          }}
          defaultValue={period}
          options={periodDropdownOptions}
          className="flex-1 mx-8 my-2"
        />
      )}

      {!data || !period ? (
        <ReportSkeleton />
      ) : (
        <Report data={data} period={period} />
      )}
    </main>
  );
}
