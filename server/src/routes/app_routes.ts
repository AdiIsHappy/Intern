import { Router, Request, Response } from "express";
import { startPreparingReport } from "../report";
import { TimePeriod } from "../types/core.types";
import { QueueData, QueueTypes } from "../types/bull.types";
import { queue } from "../bull/queue";
const apiRouter = Router();

// Generate report for the user starting from scratch
apiRouter.post("/reports", async (req: Request, res: Response) => {
  const { username } = req.body;
  const usernamel = username.toLowerCase();
  if (!username)
    return res.json({ status: "error", message: "Username is required" });
  const response = await startPreparingReport(usernamel);
  return res.json(response);
});

// Generate Report from the user using exisitng data. For testing.
apiRouter.get("/reports", async (req: Request, res: Response) => {
  const periods: TimePeriod[] = ["week", "quarter", "month"];
  const { username } = req.body;
  for (const period of periods) {
    const task: QueueData = {
      tag: username,
      type: QueueTypes.GENERATE_INSIGHTS,
      data: {
        username: username,
        period: period,
      },
    };
    await queue.add(task);
  }
  res.json({ sucess: "true" });
});

export default apiRouter;
