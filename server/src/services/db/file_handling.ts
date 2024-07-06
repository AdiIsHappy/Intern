import fs from "fs";
import path from "path";

function ensureDirectoryExist(filePath: string): void {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

export function fileExist(filePath: string): boolean {
  const absolutePath = path.resolve(filePath);
  return fs.existsSync(absolutePath);
}

export function readJsonFile(filePath: string): any {
  try {
    const absolutePath = path.resolve(filePath);
    if (!fileExist(absolutePath)) return "";
    const data = fs.readFileSync(absolutePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    throw error;
  }
}

export function writeJsonFile(filePath: string, data: any): void {
  try {
    const absolutePath = path.resolve(filePath);
    ensureDirectoryExist(absolutePath);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(absolutePath, jsonData, "utf8");
  } catch (error) {
    console.error(`Error writing JSON file at ${filePath}:`, error);
    throw error;
  }
}

export function listFilesInDirectory(directoryPath: string): string[] {
  try {
    const absolutePath = path.resolve(directoryPath);
    ensureDirectoryExist(absolutePath);
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath, { recursive: true });
    }
    const files = fs.readdirSync(absolutePath);
    return files;
  } catch (error) {
    console.error(`Error listing files in directory ${directoryPath}:`, error);
    throw error;
  }
}
