import {
  AnalysedMergeRequest,
  AnalysedNote,
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
import { ReportVert } from "../../types/vertex.types";
import { fileExist, readJsonFile, writeJsonFile } from "./file_handling";
const config = require("../../config.json");

const root = config.db.root;

export function getStoragePathDB(pathof: PathType, username?: string): string {
  switch (pathof) {
    case "UserData":
      return `${root}/gitlab/${username}.json`;
    case "MergeRequestAnalysis":
      return `${root}//merge-request-analysis/${username}.json`;
    case "NotesAnalysis":
      return `${root}/notes-analysis/${username}.json`;
    case "Report":
      return `${root}/report/${username}.json`;
    default:
      throw new Error("Invalid path requested");
  }
}

// User Data

export function storeUserDataDB(username: string, data: GQLUserNode): void {
  const storagePath = getStoragePathDB("UserData", username);
  writeJsonFile(storagePath, data);
}

export function getUserDataDB(username: string): GQLUserNode | null {
  const storagePath = getStoragePathDB("UserData", username);
  if (!fileExist(storagePath)) return null;
  return readJsonFile(storagePath);
}

// User Report
export function getUserReportDB(username: string): UserReport | null {
  const storagePath = getStoragePathDB("Report", username);
  if (!fileExist(storagePath)) return null;
  return readJsonFile(storagePath);
}

export function storeUserReportDB(username: string, data: UserReport): void {
  const storagePath = getStoragePathDB("Report", username);
  writeJsonFile(storagePath, data);
}

// Merge Request Analysis
export function getMergeRequestAnalysisDB(
  username: string
): AnalysedMergeRequestStorage | null {
  const storagePath = getStoragePathDB("MergeRequestAnalysis", username);
  if (!fileExist(storagePath)) return null;
  return readJsonFile(storagePath);
}

export function storeMergeRequestAnalysisDB(
  username: string,
  data: AnalysedMergeRequestStorage
): void {
  const storagePath = getStoragePathDB("MergeRequestAnalysis", username);
  writeJsonFile(storagePath, data);
}

// Notes
export function getNotesWithIdsDB(
  username: string,
  ids: string[]
): GQLNoteNode[] {
  const storagePath = getStoragePathDB("UserData", username);
  if (!fileExist(storagePath)) return [];
  const user = readJsonFile(storagePath) as GQLUserNode;
  const notes = user.authoredMergeRequests.nodes
    .map((mr) => mr.notes.nodes.filter((note) => ids.includes(note.id)))
    .flat();
  return notes;
}

export function addNotesToAnalysisDB(
  username: string,
  notes: AnalysedNote[]
): void {
  const storagePath = getStoragePathDB("NotesAnalysis", username);
  const existingNotes: AnalysedNoteStorage = fileExist(storagePath)
    ? readJsonFile(storagePath)
    : { updatedAt: "", data: [] };

  existingNotes.updatedAt = new Date().toISOString();
  existingNotes.data.push(...notes);
  writeJsonFile(storagePath, existingNotes);
}

export function addMergeRequestsToAnalysisDB(
  username: string,
  mergeRequests: AnalysedMergeRequest[]
): void {
  const storagePath = getStoragePathDB("MergeRequestAnalysis", username);
  const existingMergeRequests: AnalysedMergeRequestStorage = fileExist(
    storagePath
  )
    ? readJsonFile(storagePath)
    : { updatedAt: "", data: [] };

  existingMergeRequests.updatedAt = new Date().toISOString();
  existingMergeRequests.data.push(...mergeRequests);
  writeJsonFile(storagePath, existingMergeRequests);
}

export function getNotesAnalsysisDB(
  username: string
): AnalysedNoteStorage | null {
  const storagePath = getStoragePathDB("NotesAnalysis", username);
  if (!fileExist(storagePath)) return null;
  return readJsonFile(storagePath);
}

export function updateStatusDB(username: string, status: ReportStatus) {
  const filePath = getStoragePathDB("Report", username);
  if (!fileExist(filePath)) {
    throw console.error(
      `attempt to update status of ${username}. however report do no exist`
    );
  }
  const data: UserReport = readJsonFile(filePath);
  data.status = status;
  writeJsonFile(filePath, data);
}

export function storeInsightsDB(
  username: string,
  period: TimePeriod,
  insights: ReportVert
) {
  const filePath = getStoragePathDB("Report", username);
  if (!fileExist(filePath)) {
    throw console.error(
      `attempt to add insights of ${username} for period: ${period}. however report do no exist`
    );
  }
  const data: UserReport = readJsonFile(filePath);
  data.report = { ...data.report, [period]: insights };
  writeJsonFile(filePath, data);
}
