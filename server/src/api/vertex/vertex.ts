import { configDotenv } from "dotenv";
import {
  ClientError,
  GenerateContentRequest,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from "@google-cloud/vertexai";
import { writeJsonFile } from "../../services/db/file_handling";
configDotenv();

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({
  project: "gitlab-insights",
  location: "us-central1",
});
const model = "gemini-1.5-flash-001";
// const model = "gemini-1.5-pro-001";

// Instantiate the models

const generativeAiModel = vertex_ai.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0,
    topP: 0.95,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ],
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendAiPrompt(data: any, systemPrompt: string) {
  const text = { text: JSON.stringify(data) };
  const req: GenerateContentRequest = {
    contents: [{ role: "user", parts: [text] }],
    systemInstruction: systemPrompt,
  };
  let retryCount = 0;
  const maxRetries = 10;

  while (retryCount < maxRetries) {
    try {
      const streamingResp = await generativeAiModel.generateContentStream(req);

      const result = await streamingResp.response;
      writeJsonFile("AI.json", result);
      const formalNotes = JSON.parse(
        result.candidates?.at(0)?.content.parts.at(0)?.text as string
      );

      return formalNotes;
    } catch (error) {
      if (error instanceof ClientError) {
        console.log(
          `API quota exceeded. Retrying in 10 seconds... (${
            retryCount + 1
          }/${maxRetries})`
        );
        retryCount++;
        await delay(10000); // Wait for 10 seconds
      } else {
        console.log(
          `something went wrong Retrying....(${retryCount + 1}/${maxRetries})`
        );
        console.error(error);
        retryCount++;
        await delay(2000); // Wait for 10 seconds
      }
    }
  }

  throw new Error("Max retries exceeded. Could not complete the request.");
}
