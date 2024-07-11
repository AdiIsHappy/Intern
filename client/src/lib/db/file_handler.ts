"use server";
import fs from "fs";
import path from "path";

async function ensureDirectoryExist(filePath: string): Promise<void> {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    await fs.promises.mkdir(dirname, { recursive: true });
  }
}

export async function fileExist(filePath: string): Promise<boolean> {
  const absolutePath = path.resolve(filePath);
  return fs.existsSync(absolutePath);
}

export async function readJsonFile(filePath: string): Promise<any> {
  try {
    const absolutePath = path.resolve(filePath);
    if (!fileExist(absolutePath)) return "";
    const data = await fs.promises.readFile(absolutePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    throw error;
  }
}

export async function writeJsonFile(
  filePath: string,
  data: any
): Promise<void> {
  try {
    const absolutePath = path.resolve(filePath);
    ensureDirectoryExist(absolutePath);
    const jsonData = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(absolutePath, jsonData, "utf8");
  } catch (error) {
    console.error(`Error writing JSON file at ${filePath}:`, error);
    throw error;
  }
}

export async function listFilesInDirectory(
  directoryPath: string
): Promise<string[]> {
  try {
    const absolutePath = path.resolve(directoryPath);
    ensureDirectoryExist(absolutePath);
    if (!fs.existsSync(absolutePath)) {
      await fs.promises.mkdir(absolutePath, { recursive: true });
    }
    const files = await fs.promises.readdir(absolutePath);
    return files;
  } catch (error) {
    console.error(`Error listing files in directory ${directoryPath}:`, error);
    throw error;
  }
}
