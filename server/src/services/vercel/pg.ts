import pg from "pg";
import { User } from "../../types/vercel.types";
import { config } from "dotenv";

config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function upsertUser(user: User): Promise<void> {
  const client = await pool.connect();

  try {
    const query = `
      INSERT INTO users (username, name, web_url, profile_pic_url, report_url, manager_username)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (username) DO UPDATE SET
        name = EXCLUDED.name,
        web_url = EXCLUDED.web_url,
        profile_pic_url = EXCLUDED.profile_pic_url,
        report_url = EXCLUDED.report_url,
        manager_username = EXCLUDED.manager_username;
    `;

    const values = [
      user.username,
      user.name,
      user.webUrl,
      user.profilePicUrl,
      user.reportUrl,
      user.managerUsername || null, // Handle managerUsername being optional
    ];

    await client.query(query, values);
  } catch (error) {
    console.error("Error upserting user:", error);
  } finally {
    client.release();
  }
}
