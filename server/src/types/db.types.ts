import { AnalysedMergeRequest, AnalysedNote } from "./core.types";

export type PathType =
  | "UserData"
  | "MergeRequestAnalysis"
  | "NotesAnalysis"
  | "Report";
export type AnalysedMergeRequestStorage = TrackedStorage<
  AnalysedMergeRequest[]
>;
export type AnalysedNoteStorage = TrackedStorage<AnalysedNote[]>;

export interface TrackedStorage<T> {
  updatedAt: string;
  data: T;
}
