import {
  AnalysedMergeRequest,
  AnalysedNote,
  InsightsReport,
  ReportStatus,
  TimePeriod,
  UserReport,
} from "../../types/core.types";
import {
  AnalysedMergeRequestStorage,
  AnalysedNoteStorage,
  PathType,
} from "../../types/db.types";
import { GQLNoteNode, GQLUserNode } from "../../types/gitlab.types";
import { fileExist, readJsonFile, writeJsonFile } from "./file_handling";
const config = require("../../config.json");

const root = config.db.root;

export function getStoragePath(
  pathof: PathType,
  username?: string,
  period?: TimePeriod
): string {
  switch (pathof) {
    case "UserData":
      return `${root}/gitlab/${username}.json`;
    case "MergeRequestAnalysis":
      return `${root}//merge-request-analysis/${username}.json`;
    case "NotesAnalysis":
      return `${root}/notes-analysis/${username}.json`;
    case "Report":
      return `${root}/report/${period}/${username}.json`;
    default:
      throw new Error("Invalid path requested");
  }
}

// User Data

export function storeUserData(username: string, data: GQLUserNode): void {
  const storagePath = getStoragePath("UserData", username);
  writeJsonFile(storagePath, data);
}

export function getUserData(username: string): GQLUserNode | null {
  const storagePath = getStoragePath("UserData", username);
  if (!fileExist(storagePath)) return null;
  return readJsonFile(storagePath);
}

// User Report
export function getUserReport(
  username: string,
  period: TimePeriod
): UserReport | null {
  const storagePath = getStoragePath("Report", username, period);
  if (!fileExist(storagePath)) return null;
  return readJsonFile(storagePath);
}

export function storeUserReport(
  username: string,
  period: TimePeriod,
  data: UserReport
): void {
  const storagePath = getStoragePath("Report", username, period);
  writeJsonFile(storagePath, data);
}

// Merge Request Analysis
export function getMergeRequestAnalysis(
  username: string
): AnalysedMergeRequestStorage | null {
  const storagePath = getStoragePath("MergeRequestAnalysis", username);
  if (!fileExist(storagePath)) return null;
  return readJsonFile(storagePath);
}

export function storeMergeRequestAnalysis(
  username: string,
  data: AnalysedMergeRequestStorage
): void {
  const storagePath = getStoragePath("MergeRequestAnalysis", username);
  writeJsonFile(storagePath, data);
}

// Notes
export function getNotesWithIds(
  username: string,
  ids: string[]
): GQLNoteNode[] {
  const storagePath = getStoragePath("UserData", username);
  if (!fileExist(storagePath)) return [];
  const user = readJsonFile(storagePath) as GQLUserNode;
  const notes = user.authoredMergeRequests.nodes
    .map((mr) => mr.notes.nodes.filter((note) => ids.includes(note.id)))
    .flat();
  return notes;
}

export function addNotesToAnalysis(
  username: string,
  notes: AnalysedNote[]
): void {
  const storagePath = getStoragePath("NotesAnalysis", username);
  const existingNotes: AnalysedNoteStorage = fileExist(storagePath)
    ? readJsonFile(storagePath)
    : { updatedAt: "", data: [] };

  existingNotes.updatedAt = new Date().toISOString();
  existingNotes.data.push(...notes);
  writeJsonFile(storagePath, existingNotes);
}

export function addMergeRequestsToAnalysis(
  username: string,
  mergeRequests: AnalysedMergeRequest[]
): void {
  const storagePath = getStoragePath("MergeRequestAnalysis", username);
  const existingMergeRequests: AnalysedMergeRequestStorage = fileExist(
    storagePath
  )
    ? readJsonFile(storagePath)
    : { updatedAt: "", data: [] };

  existingMergeRequests.updatedAt = new Date().toISOString();
  existingMergeRequests.data.push(...mergeRequests);
  writeJsonFile(storagePath, existingMergeRequests);
}

export function getNotesAnalsysis(
  username: string
): AnalysedNoteStorage | null {
  const storagePath = getStoragePath("NotesAnalysis", username);
  if (!fileExist(storagePath)) return null;
  return readJsonFile(storagePath);
}

export function updateStatus(
  username: string,
  period: TimePeriod,
  status: ReportStatus
) {
  const filePath = getStoragePath("Report", username, period);
  if (!fileExist(filePath)) {
    throw console.error(
      `attempt to update status of ${username} for period: ${period}. however report do no exist`
    );
  }
  const data: UserReport = readJsonFile(filePath);
  data.status = status;
  writeJsonFile(filePath, data);
}

export function storeInsights(
  username: string,
  period: TimePeriod,
  insights: InsightsReport
) {
  const filePath = getStoragePath("Report", username, period);
  if (!fileExist(filePath)) {
    throw console.error(
      `attempt to add insights of ${username} for period: ${period}. however report do no exist`
    );
  }
  const data: UserReport = readJsonFile(filePath);
  data.report = { insights };
  writeJsonFile(filePath, data);
}
