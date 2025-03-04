import handler from "@/pages/api/users";
import { createMocks } from "node-mocks-http";
import { UserDTO } from "@/schemas";
import { UserService } from "@/services/userService";

// Mock the userService to return a resolved promise with the user
jest.mock("@/services/userService", () => {
  return {
    UserService: jest.fn().mockImplementation(() => ({
      addUser: jest.fn().mockImplementation((user) => Promise.resolve(user)),
    })),
  };
});

describe("POST /api/users", () => {
  test("should return 201 and the created user when input is valid", async () => {
    const userService = new UserService();
    const newValidUser: UserDTO = {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      dialingCode: "+1",
      phoneNumber: "1234567890",
      linkedInUrl: "https://www.linkedin.com/in/alice",
    };

    // Mock userService.addUser() to return the new user
    (userService.addUser as jest.Mock).mockResolvedValue(newValidUser);

    // Create a mock request and response
    const { req, res } = createMocks({
      method: "POST",
      body: newValidUser,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual(newValidUser);
  });

  test("should return 400 if some required fields are missing", async () => {
    const invalidUser = {
      id: 1,
      name: "Alice",
      email: "",
      dialingCode: "",
      phoneNumber: "",
      linkedInUrl: "",
    };

    const { req, res } = createMocks({
      method: "POST",
      body: invalidUser,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: "No email provided" }),
        expect.objectContaining({ message: "No dialing code provided" }),
        expect.objectContaining({ message: "No phone number provided" }),
        expect.objectContaining({ message: "No LinkedIn URL provided" }),
      ])
    );
  });

  test("should return 400 if email is invalid", async () => {
    const invalidUser = {
      id: 1,
      name: "Alice",
      email: "alice",
      dialingCode: "+1",
      phoneNumber: "1234567890",
      linkedInUrl: "https://www.linkedin.com/in/alice",
    };

    const { req, res } = createMocks({
      method: "POST",
      body: invalidUser,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: "Invalid email format" }),
      ])
    );
  });

  test.each([
    ["no https", "www.linkedin.com/in/alice"],
    ["no linkedin.com", "https://www.google.com/in/alice"],
    ["no /in/", "https://www.linkedin.com/alice"],
  ])(
    "should return 400 if linkedin url is invalid (%s)",
    async (_, linkedInUrl) => {
      const invalidUser = {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        dialingCode: "+1",
        phoneNumber: "1234567890",
        linkedInUrl,
      };

      const { req, res } = createMocks({
        method: "POST",
        body: invalidUser,
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(400);
      expect(res._getJSONData().issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ message: "Invalid LinkedIn URL" }),
        ])
      );
    }
  );
});
