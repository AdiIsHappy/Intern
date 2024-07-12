import axios from "axios";
import dotenv from "dotenv";
import { RSTDiffNode, RSTUserEvent } from "../../types/gitlab.types";
dotenv.config();

const GITLAB_GRAPHQL_URL = "https://gitlab.com/api/graphql";
const GITLAB_ACCESS_TOKEN = process.env.GITLAB_ACCESS_TOKEN;

export async function fetchDataFromGitlabAsync(query: string): Promise<Object> {
  try {
    const response = await axios.post(
      GITLAB_GRAPHQL_URL,
      { query },
      {
        headers: {
          Authorization: `Bearer ${GITLAB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching GitLab data:", error);
    throw error;
  }
}

export async function getMergeRequestDiffAsync(
  projectPath: string,
  mergeRequestId: string
): Promise<RSTDiffNode[]> {
  const url = `https://gitlab.com/api/v4/projects/${encodeURIComponent(
    projectPath
  )}/merge_requests/${mergeRequestId}/diffs`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITLAB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch merge request changes: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}

export async function fetchAllUserEvents(
  userId: number | string,
  perPage = 100
): Promise<RSTUserEvent[]> {
  const url = `https://gitlab.com/api/v4/users/${userId}/events`;
  let allEvents: RSTUserEvent[] = [];
  let page = 1;
  let moreEvents = true;

  while (moreEvents) {
    try {
      const response = await fetch(`${url}?page=${page}&per_page=${perPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const events: RSTUserEvent[] = await response.json();
      allEvents = allEvents.concat(events);

      if (events.length < perPage) {
        moreEvents = false;
      } else {
        page++;
      }
    } catch (error) {
      console.error("Error fetching user events:", error);
      break;
    }
  }

  return allEvents;
}

