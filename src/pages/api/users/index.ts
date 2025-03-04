import type { NextApiRequest, NextApiResponse } from "next";
import { UserDTO, userSchema } from "@/schemas";
import { UserService } from "@/services/userService";
import { loggerWrapper } from "@/middleware/loggerWrapper";

// Inject UserService
const userService = new UserService();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get all users
  if (req.method === "GET") {
    const users = await userService.getAllUsers();
    return res.status(200).send(JSON.stringify(users, null, 2));
  }

  // Add a new user
  if (req.method === "POST") {
    try {
      const validatedUser: UserDTO = userSchema.parse(req.body); // Validate input
      const newUser = await userService.addUser(validatedUser);
      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error adding user:", error);
      return res
        .status(400)
        .json({ message: `User with id ${req.body.id} already exists` });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default loggerWrapper(handler);
