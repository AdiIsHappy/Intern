import { SystemPrompts } from "../../api/vertex/prompts";
import { sendAiPrompt } from "../../api/vertex/vertex";
import { addNotesToAnalysis, getUserData } from "../../services/db/db";
import { QueueData, QueueTypes } from "../../types/bull.types";
import { AnalysedNote, TimePeriod } from "../../types/core.types";
import { VERTNoteBody, VERTNoteForAnalysis } from "../../types/vertex.types";
import { queue } from "../queue";

export async function analyseNotesAsync(username: string, noteIds: string[]) {
  // get notes for analysis
  // :STORAGE
  const userData = getUserData(username);
  if (userData === null) {
    return;
  }
  const notes = userData.authoredMergeRequests.nodes
    .filter((mr) => mr !== null)
    .map((mr) =>
      mr.notes.nodes
        .filter((note) => note !== null && noteIds.includes(note.id))
        .map((note) => ({
          id: note.id,
          body: note.body,
          position: note.position === null ? "" : note.position.filePath,
          createdAt: note.createdAt,
          mergeRequest: {
            id: mr.id,
            title: mr.title,
            description: mr.description,
            labels: mr.labels.nodes.map((label) => label.title),
          },
        }))
    )
    .flat();

  const notesBody: VERTNoteBody[] = notes.map((note) => ({
    id: note.id,
    body: note.body,
  }));

  // formalize notes
  try {
    const formalComments = await sendAiPrompt<VERTNoteBody[], VERTNoteBody[]>(
      notesBody,
      SystemPrompts.NOTE_FORMAL
    );

    formalComments.forEach((comment) => {
      notes.find((e) => e.id === comment.id)!.body = comment.body;
    });
  } catch (error) {
    console.error(
      "Error in formalising comments rescheduling Analysis for later",
      error
    );
    const task: QueueData = {
      tag: username,
      type: QueueTypes.VERTEX_ANALYSE_NOTES,
      data: {
        username,
        noteIds,
      },
    };
    await queue.add(task);
    return;
  }

  // analyse notes
  let analysedNotes: AnalysedNote[] = [];
  try {
    const notesForAnalysis: VERTNoteForAnalysis[] = notes.map((note) => ({
      id: note.id,
      body: note.body,
      position: note.position,
      mergeRequest: note.mergeRequest,
    }));

    analysedNotes = await sendAiPrompt<AnalysedNote[], VERTNoteForAnalysis[]>(
      notesForAnalysis,
      SystemPrompts.NOTE_ANALYSIS
    );

    analysedNotes.forEach((analysedNote) => {
      const note = notes.find((e) => e.id === analysedNote.id);
      if (note) {
        analysedNote.mergeRequestId = note.mergeRequest.id;
        analysedNote.createdAt = note.createdAt;
      }
    });
  } catch (error) {
    console.error(
      "Error in analysing notes rescheduling Analysis for later",
      error
    );
    const task: QueueData = {
      tag: username,
      type: QueueTypes.VERTEX_ANALYSE_NOTES,
      data: {
        username,
        noteIds,
      },
    };
    await queue.add(task);
    return;
  }

  // Update notes in storage
  // :STORAGE
  addNotesToAnalysis(username, analysedNotes);
}
