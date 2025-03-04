import { loadLogs } from "@/utilties/helper";

export class LogService {
  async getLogs() {
    try {
      return await loadLogs();
    } catch (err) {
      console.error(err);
      throw new Error("Failed to load logs");
    }
  }
}
