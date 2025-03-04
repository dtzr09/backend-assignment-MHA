import type { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "../../../services/userService";
import { loggerWrapper } from "@/middleware/loggerWrapper";

// Inject UserService
const userService = new UserService();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the id from request query and convert it to integer
  const id: number = parseInt(req.query.id as string);

  // Get user by id
  if (req.method === "GET") {
    try {
      const user = await userService.getUserById(id);

      // If user is not found, return 404
      if (!user) {
        return res
          .status(404)
          .json({ message: `User with id ${id} not found` });
      }

      return res.status(200).send(JSON.stringify(user, null, 2));
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
  }

  // Delete user by id
  if (req.method === "DELETE") {
    try {
      const response = await userService.deleteUser(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
  }

  // Return 405 if method is not allowed
  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default loggerWrapper(handler);
