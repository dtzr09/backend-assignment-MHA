import { UserService } from "@/services/userService";
import { loadUsers, saveUsers } from "@/utilties/helper";
import { UserDTO } from "@/schemas";

// Mock helper functions
jest.mock("@/utilties/helper", () => ({
  loadUsers: jest.fn(),
  saveUsers: jest.fn(),
}));

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe("getAllUsers()", () => {
    test("should return all users", async () => {
      const users = [{ id: 1, name: "Alice", email: "alice@example.com" }];
      (loadUsers as jest.Mock).mockResolvedValue(users);

      const result = await userService.getAllUsers();
      expect(result).toEqual(users);
    });

    test("should throw an error if users are not found", async () => {
      (loadUsers as jest.Mock).mockRejectedValue(
        new Error("Failed to load users")
      );

      await expect(userService.getAllUsers()).rejects.toThrow(
        "Failed to load users"
      );
    });
  });

  describe("getUserById", () => {
    test("should return a specific user", async () => {
      const users = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
      ];
      (loadUsers as jest.Mock).mockResolvedValue(users);

      const result = await userService.getUserById(1);
      expect(result).toEqual(users[0]);
    });

    test("should throw an error if user is not found", async () => {
      (loadUsers as jest.Mock).mockResolvedValue([]);

      await expect(userService.getUserById(1)).rejects.toThrow(
        "User not found"
      );
    });
  });

  describe("addUser", () => {
    test("should add a user and save to JSON", async () => {
      const newUser: UserDTO = {
        id: 3,
        name: "Charlie",
        email: "charlie@example.com",
        dialingCode: "+1",
        phoneNumber: "1234567890",
        linkedInUrl: "https://www.linkedin.com/in/charlie",
      };
      (loadUsers as jest.Mock).mockResolvedValue([]);
      (saveUsers as jest.Mock).mockResolvedValue(undefined);

      const result = await userService.addUser(newUser);
      expect(result).toEqual(newUser);
      expect(saveUsers).toHaveBeenCalledWith([newUser]);
    });

    test("should throw an error when adding a user of the same id", async () => {
      const newUser: UserDTO = {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        dialingCode: "+1",
        phoneNumber: "1234567890",
        linkedInUrl: "https://www.linkedin.com/in/alice",
      };
      (loadUsers as jest.Mock).mockResolvedValue([newUser]);

      await expect(userService.addUser(newUser)).rejects.toThrow(
        "User already exists"
      );
    });
  });

  describe("deleteUser", () => {
    test("should remove a user", async () => {
      (loadUsers as jest.Mock).mockResolvedValue([
        { id: 1, name: "Alice", email: "alice@example.com" },
      ]);

      const response = await userService.deleteUser(1);
      expect(response).toEqual({ message: "User deleted successfully" });
      expect(saveUsers).toHaveBeenCalledWith([]);
    });

    test("should throw an error if user not found", async () => {
      (loadUsers as jest.Mock).mockResolvedValue([]);

      await expect(userService.deleteUser(99)).rejects.toThrow(
        "User not found"
      );
    });
  });
});
