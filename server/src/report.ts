import { getUserReport, storeUserReport } from "./services/db/db";
import { checkIfUserExistsAsync } from "./services/gitlab/gitlab";
import { DateTime } from "luxon";
import { QueueData, QueueTypes } from "./types/bull.types";
import { queue } from "./bull/queue";
const config = require("./config.json");

const considerSameReportPeriod = config.analysis.reportUpdatePeriod;

export async function startPreparingReport(username: string) {
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

  const userReport = getUserReport(username);
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
    DateTime.fromISO(userReport.updatedAt).startOf(considerSameReportPeriod) ===
      DateTime.now().startOf(considerSameReportPeriod)
  ) {
    return {
      status: "error",
      message: `Report is already prepared and avaliable`,
    };
  }

  // Start preparing report
  if (userReport === null) {
    storeUserReport(username, {
      username,
      updatedAt: DateTime.now().toISO(),
      status: "Getting Data",
      report: null,
    });
  } else {
    userReport.status = "Getting Data";
    userReport.updatedAt = DateTime.now().toISO();
    storeUserReport(username, userReport);
  }

  // Get user data from gitlab
  const task: QueueData = {
    type: QueueTypes.GITLAB_FETCH,
    tag: username,
    data: { username: username },
  };
  await queue.add(task);
  return { status: "success", message: "Started prepearing user report" };
}
