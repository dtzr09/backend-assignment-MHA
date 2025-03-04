import fs from "fs/promises";
import { UserDTO } from "../schemas/index";
import { logFilePath } from "@/middleware/logger";
import path from "path";

const dataFile = path.join(process.cwd(), "src/data/users.json");
const tmpUserDataFile = "/tmp/users.json";

async function initializeTmpFile() {
  try {
    await fs.access(tmpUserDataFile);
  } catch {
    try {
      const data = await fs.readFile(dataFile, "utf8");
      await fs.writeFile(tmpUserDataFile, data, "utf8");
    } catch (error) {
      console.error("Error copying users.json to /tmp/:", error);
    }
  }
}

// Load users from the data file
export const loadUsers = async () => {
  try {
    await initializeTmpFile();
    const data = await fs.readFile(tmpUserDataFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading users:", err);
    return [];
  }
};

// Save users to the data file
export const saveUsers = async (users: UserDTO[]) => {
  try {
    await fs.writeFile(tmpUserDataFile, JSON.stringify(users, null, 4), "utf8");
  } catch (err) {
    console.error("Error saving users:", err);
  }
};

export const loadLogs = async () => {
  try {
    const logFile = await fs.readFile(logFilePath, "utf8");
    const logEntries = logFile.split("\n").filter((line) => line.trim() !== "");
    return logEntries.join("\n");
  } catch (err) {
    console.error("Error loading logs:", err);
    return [];
  }
};
