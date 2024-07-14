import {
  getUserDataDB,
  getUserReportDB,
  updateStatusDB,
} from "../services/db/db";
import { uploadUserDataToBlob } from "../services/vercel/blob";
import { upsertUser } from "../services/vercel/pg";
import { QueueTypes, QueueData } from "../types/bull.types";
import { TimePeriod } from "../types/core.types";
import { User } from "../types/vercel.types";
import { queue } from "./queue";
import { analyseMergeRequestsAsync } from "./workers/analyse_merge_requests";
import { analyseNotesAsync } from "./workers/analyse_notes";
import { fecthUserDataAsync } from "./workers/fecth_user_data";
import { generateReport } from "./workers/generate_report";
import { ScheduleAnalysisAsync } from "./workers/schedule_analysis";

queue.process(1, async (job) => {
  const data = job.data as QueueData;
  const type = data.type;
  if (type === QueueTypes.GITLAB_FETCH) {
    await fecthUserDataAsync(data.data.username, data.tag);
  } else if (type === QueueTypes.ANALYSIS_SCHDULER) {
    await ScheduleAnalysisAsync(data.data.username, data.tag);
  } else if (type === QueueTypes.VERTEX_ANALYSE_NOTES) {
    await analyseNotesAsync(data.data.username, data.data.noteIds);
  } else if (type === QueueTypes.VERTEX_ANALYSE_MERGE_REQUEST) {
    await analyseMergeRequestsAsync(
      data.data.username,
      data.data.mergeRequestIds
    );
  } else if (type === QueueTypes.GENERATE_INSIGHTS) {
    await generateReport(data.data.username, data.data.period);
  }
});

queue.on("completed", async (job) => {
  // get active jobs with this tag
  const activeJobs = await queue.getJobs(["active", "waiting"]);
  const tag = job.data.tag;
  const count = activeJobs.filter((j) => j.data.tag === tag).length;
  if (count === 0) {
    if (
      job.data.type === QueueTypes.VERTEX_ANALYSE_MERGE_REQUEST ||
      job.data.type === QueueTypes.VERTEX_ANALYSE_NOTES
    ) {
      await updateStatusDB(job.data.data.username, "Preparing Presentation");
      const periods: TimePeriod[] = ["month", "week", "quarter"];
      for (const period of periods) {
        const task: QueueData = {
          tag: job.data.tag,
          type: QueueTypes.GENERATE_INSIGHTS,
          data: {
            username: job.data.data.username,
            period: period,
          },
        };
        await queue.add(task);
      }
    } else if (job.data.type === QueueTypes.GENERATE_INSIGHTS) {
      const report = getUserReportDB(job.data.data.username);
      if (report) {
        const response = await uploadUserDataToBlob(
          job.data.data.username,
          report
        );
        const userData = getUserDataDB(job.data.data.username);
        const userInfo: User = {
          managerUsername: null,
          name: userData?.name || "",
          profilePicUrl: userData?.avatarUrl || "",
          reportUrl: response.url,
          username: userData?.username || "",
          webUrl: userData?.webUrl || "",
        };
        await upsertUser(userInfo);
      }
    }
    console.log(`Insights generated for ${job.data.data.username}`);
  }
});
