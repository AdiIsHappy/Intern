"use server";
import pg from "pg";
import { User } from "../types/core.types";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const query = (text: string, params?: any[]) => pool.query(text, params);

export const getUserByUsername = async (username: string) => {
  const text = "SELECT * FROM users WHERE username = $1";
  const values = [username];

  try {
    const res = await query(text, values);
    if (res.rows.length === 0) {
      return null; // No user found
    }
    return res.rows[0];
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

export const getAllUsersUnderUsername = async (
  username: string
): Promise<User[]> => {
  const text = `
      WITH RECURSIVE subordinates AS (
        SELECT username, name, web_url, profile_pic_url, report_url, manager_username
        FROM users
        WHERE username = $1
        UNION
        SELECT u.username, u.name, u.web_url, u.profile_pic_url, u.report_url, u.manager_username
        FROM users u
        INNER JOIN subordinates s ON s.username = u.manager_username
      )
      SELECT * FROM subordinates;
    `;
  const values = [username];

  try {
    const res = await query(text, values);
    return res.rows as User[];
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};
