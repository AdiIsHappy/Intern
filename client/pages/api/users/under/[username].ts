// pages/api/users/under/[username].ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAllUsersUnderUsername } from "@/lib/db/pg";

const Page = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query;

  if (typeof username !== "string") {
    return res.status(400).json({ error: "Invalid username" });
  }

  try {
    const users = await getAllUsersUnderUsername(username);
    return res.status(200).json(users);
  } catch (err) {
    console.error("Error getting users under username", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export default Page;
