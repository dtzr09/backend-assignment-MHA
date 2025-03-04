import { NextApiRequest, NextApiResponse } from "next";
import { LogService } from "@/services/logService";

const logService = new LogService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const logs = await logService.getLogs();
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(logs);
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
