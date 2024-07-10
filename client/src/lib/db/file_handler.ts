"use server";
import fs from "fs";
import path from "path";

async function ensureDirectoryExist(filePath: string): Promise<void> {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
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
    const data = fs.readFileSync(absolutePath, "utf8");
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
    fs.writeFileSync(absolutePath, jsonData, "utf8");
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
      fs.mkdirSync(absolutePath, { recursive: true });
    }
    const files = fs.readdirSync(absolutePath);
    return files;
  } catch (error) {
    console.error(`Error listing files in directory ${directoryPath}:`, error);
    throw error;
  }
}

export const printFileStructure = async (dir: string, level = 0) => {
  const indent = "  ".repeat(level);
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      console.log(`${indent}- ${file}/`);
      printFileStructure(filePath, level + 1);
    } else {
      console.log(`${indent}- ${file}`);
    }
  });
};