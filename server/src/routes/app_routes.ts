import { Router, Request, Response } from "express";
import { startPreparingReport } from "../report";
const apiRouter = Router();

apiRouter.post("/reports", async (req: Request, res: Response) => {
  const { username } = req.body;
  const usernamel = username.toLowerCase();
  if (!username)
    return res.json({ status: "error", message: "Username is required" });
  const response = await startPreparingReport(usernamel);
  return res.json(response);
});

export default apiRouter;
