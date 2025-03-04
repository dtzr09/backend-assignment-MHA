import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { loggerMiddleware } from "./logger";

// Higher-order function to apply logging middleware to API routes.
export function loggerWrapper(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    loggerMiddleware(req, res, () => {}); // Apply logging middleware
    return handler(req, res);
  };
}
