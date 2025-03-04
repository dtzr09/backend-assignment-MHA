import { loadUsers, saveUsers } from "../utilties/helper";
import { UserDTO } from "../schemas";

export class UserService {
  async getAllUsers() {
    try {
      return await loadUsers();
    } catch (err) {
      console.error(err);
      throw new Error("Failed to load users");
    }
  }

  async addUser(user: UserDTO) {
    try {
      const users = await loadUsers();
      if (users.some((u: UserDTO) => u.id === user.id)) {
        throw new Error("User already exists");
      }

      users.push(user);
      await saveUsers(users);
      return user;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async deleteUser(id: number) {
    try {
      const users = await loadUsers();
      const index = users.findIndex((user: UserDTO) => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
        await saveUsers(users);
        return { message: "User deleted successfully" };
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getUserById(id: number) {
    try {
      const users = await loadUsers();
      const user = users.find((user: UserDTO) => user.id === id);
      return user;
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
