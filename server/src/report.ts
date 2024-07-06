import { getUserReport, storeUserReport } from "./services/db/db";
import { checkIfUserExistsAsync } from "./services/gitlab/gitlab";
import { DateTime } from "luxon";
import { TimePeriod } from "./types/core.types";
import { QueueData, QueueTypes } from "./types/bull.types";
import { queue } from "./bull/queue";

export async function startPreparingReport(
  username: string,
  period: TimePeriod
) {
  // Check if gitlab user exists or not
  try {
    const userName = await checkIfUserExistsAsync(username);
    if (!userName) {
      return { status: "error", message: "User does not exist" };
    }
  } catch (error) {
    console.error("Error while checking user existence", error);
    return { status: "error", message: "Error while checking user existence" };
  }

  const userReport = getUserReport(username, period);
  // Check if user report is already being prepared
  if (userReport !== null && userReport.status !== "Avaliable") {
    return {
      status: "error",
      message: `Report is already being prepared. status : ${userReport.status}`,
    };
    // Check if user report is already prepared compare its time period
  } else if (
    userReport !== null &&
    userReport.status === "Avaliable" &&
    DateTime.fromISO(userReport.updatedAt).startOf(period) ===
      DateTime.now().startOf(period)
  ) {
    return {
      status: "error",
      message: `Report is already prepared and avaliable`,
    };
  }

  // Start preparing report
  if (userReport === null) {
    storeUserReport(username, period, {
      username,
      updatedAt: DateTime.now().toISO(),
      period,
      status: "Getting Data",
      report: null,
    });
  } else {
    userReport.status = "Getting Data";
    userReport.updatedAt = DateTime.now().toISO();
    storeUserReport(username, period, userReport);
  }

  // Get user data from gitlab
  const task: QueueData = {
    type: QueueTypes.GITLAB_FETCH,
    tag: username,
    data: { username: username, period: period },
  };
  await queue.add(task);
  return { status: "success", message: "Started prepearing user report" };
}
