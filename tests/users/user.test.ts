import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import { FastifyInstance } from "fastify";
import { getTestJwt } from "./test-utils/getTestJwt";

const hash = (): string => {
  return Math.random().toString(36).substring(7);
};

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

  it("should create an user", async () => {
    const user = {
      name: `Teste ${hash()}`,
      email: `teste-${hash()}@gmail.com`,
      password: "1234567",
    };

    const response = await server.inject({
      url: "/users",
      method: "POST",
      body: user,
    });

    expect(response.statusCode).toEqual(201);
  });

  it("should not create an user with an empty email", async () => {
    const user = {
      name: "Teste",
      email: "",
      password: "1234567",
    };

    const response = await server.inject({
      url: "/users",
      method: "POST",
      body: user,
    });
    expect(response.statusCode).toEqual(400);
  });

  it("should not create an user with an empty password", async () => {
    const user = {
      name: "Teste",
      email: `teste-${hash()}@gmail.com`,
      password: "",
    };

    const response = await server.inject({
      url: "/users",
      method: "POST",
      body: user,
    });

    expect(response.statusCode).toEqual(400);
  });

  it.skip("should not update an user with an empty token", async () => {
    //need to resolve wrong message received
    const user = {
      name: "Teste",
      email: `vilasesamo-${hash()}@gmail.com`,
      password: "1234567",
      token: "",
    };

    const response = await app.inject({
      url: "/users",
      method: "PUT",
      cookies: {},
      payload: user,
    });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toEqual({
      status: "Error",
      message: "Usuário não autenticado.",
    });
  });

  it("should update an user name", async () => {
    const user = {
      id: "4b48bcda-2b38-4cf5-a8d6-3ec2ac58157d",
      name: "Arthur3",
      email: "user3@email.com",
      old_password: "1234567",
      password: "123456",
    };

    const token = await getTestJwt(user, server);

    const response = await server.inject({
      url: "/users",
      method: "PUT",
      body: user,
      headers: {
        authorization: `Bearer ${token}` 
      },
      cookies: {
        token: token
      }
    })

    expect(response.statusCode).toEqual(200);
  });
});
