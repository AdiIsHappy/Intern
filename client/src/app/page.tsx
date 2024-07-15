"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Dropdown from "@/components/dropdown";
import { Navbar } from "@/app/page_components/navbar";
import { Report } from "@/app/page_components/report";
import { getReport } from "@/lib/db/db";
import { TimePeriod, userReport, User } from "@/lib/types/core.types";
import { getAllUsersUnderUsername, getUserByUsername } from "@/lib/db/pg";
import { ReportSkeleton } from "@/components/report_skeleton";

const authenticatedUsername = "grote";

export default function MergeRequestAssessment() {
  const [period, setPeriod] = useState<TimePeriod>("month");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
  const [data, setData] = useState<userReport | null>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const periodDropdownOptions: { value: TimePeriod; label: string }[] = [
    { value: "month", label: "last 4 months" },
    { value: "week", label: "last 6 weeks" },
    { value: "quarter", label: "last 2 quarters" },
  ];

  useEffect(() => {
    const fetchAuthenticatedUserData = async () => {
      try {
        setLoading(true);
        const user = await getUserByUsername(authenticatedUsername);
        setAuthenticatedUser(user);
        const members = await getAllUsersUnderUsername(authenticatedUsername);
        setTeamMembers(members);
        setSelectedUser(members[0].username);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
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
        setLoading(true);
        const result = await getReport(selectedUser, period);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchReportData();
  }, [selectedUser, period]);

  return (
    <main className="pt-24 flex flex-col justify-center items-center">
      {authenticatedUser ? (
        <Navbar
          onUserSelect={(user: string) => {
            setSelectedUser(user);
            setData(null);
          }}
          username={authenticatedUser.username}
          name={authenticatedUser.name}
          profilePic={authenticatedUser.profile_pic_url}
          teamMembers={teamMembers.map((member) => ({
            name: member.name,
            username: member.username,
            avatarUrl: member.profile_pic_url,
          }))}
          className="fixed top-12 left-0 right-0 z-50 bg-white shadow-md"
          activeUser={selectedUser}
        />
      ) : (
        <div className="fixed top-12 left-0 right-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-1">
          <Skeleton height={30} width={160} className="mx-4" />
          <Skeleton height={40} width={40} className="mx-4" />
        </div>
      )}

      {loading ? (
        <Skeleton containerClassName="flex-1 mx-8 my-2 w-1/4" height={40} />
      ) : (
        selectedUser && (
          <Dropdown
            label="Period"
            onChange={(val: string) => setPeriod(val as TimePeriod)}
            defaultValue={period}
            options={periodDropdownOptions}
            className="flex-1 mx-8 my-2"
          />
        )
      )}

      {!data ? <ReportSkeleton /> : <Report data={data} period={period} />}
    </main>
  );
}
