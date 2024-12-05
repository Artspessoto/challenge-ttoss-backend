import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import { FastifyInstance } from "fastify";

let server: FastifyInstance;

beforeEach(() => {
  server = app;
});

describe("User routes", () => {
  it("should return a list of users", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/users",
    });

    expect(response.statusCode).toBe(200);

    const responseBody = JSON.parse(response.body);
    expect(responseBody).toHaveProperty("list");

    expect(Array.isArray(responseBody.list)).toBe(true);
    expect(responseBody.list.length).toBeGreaterThan(0);

    const user = responseBody.list[0];
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("createdAt");
    expect(user).toHaveProperty("updatedAt");
  });
});
