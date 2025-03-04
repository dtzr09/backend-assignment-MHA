import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

const logDir = "/tmp";
export const logFilePath = path.join(logDir, "api.log");

// Ensure the log directory exists, if not, create it
async function checkLogDirExists() {
  try {
    await fs.mkdir(logDir, { recursive: true });
  } catch (error) {
    console.error("Error checking log directory exists:", error);
  }
}

export async function loggerMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  await checkLogDirExists();

  // Log the request and response after the request is finished
  res.on("finish", async () => {
    const now = new Date();
    const timestamp = now.toLocaleString("en-US", {
      month: "short", // "MAR"
      day: "2-digit", // "04"
      hour: "2-digit", // "22"
      minute: "2-digit", // "01"
      second: "2-digit", // "25"
      hour12: false, // 24-hour format
      timeZone: "Asia/Singapore",
    });

    const message = `[${timestamp}] ${req.method} ${res.statusCode} ${req.url}\n`;

    // Appends log message asynchronously to the log file
    try {
      await fs.appendFile(logFilePath, message, "utf8");
    } catch (error) {
      console.error("Error writing to log file:", error);
    }
  });

  // Continue to the next API route handler
  return next();
}
