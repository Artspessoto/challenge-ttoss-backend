import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import { FastifyInstance } from "fastify";
import { getTestJwt } from "../test-utils/getTestJwt";
import { isObject } from "util";

const endpoint = "/videos";

let server: FastifyInstance;

beforeEach(() => {
  server = app;
});

describe("Video routes", () => {
  it("should return a list of videos", async () => {
    const response = await server.inject({
      method: "GET",
      url: `${endpoint}/list`,
    });

    const responseBody = JSON.parse(response.body);

    expect(responseBody).toHaveProperty("videos");
    expect(isObject(responseBody.videos)).toBe(true);

    const videos = responseBody.videos[0];
    expect(videos).toHaveProperty("id");
    expect(videos).toHaveProperty("title");
    expect(videos).toHaveProperty("url");
    expect(videos).toHaveProperty("src");
    expect(videos).toHaveProperty("rating");
    expect(videos).toHaveProperty("createdAt");
    expect(videos).toHaveProperty("updatedAt");

    expect(response.statusCode).toBe(200);
  });

  it("should return a list of videos by elo rating", async () => {
    const response = await server.inject({
      method: "GET",
      url: `${endpoint}/elo`,
    });

    const { eloRanked } = JSON.parse(response.body);

    expect(Array.isArray(eloRanked)).toBe(true);
    expect(eloRanked.length).toBeGreaterThan(0);

    for (let i = 1; i < eloRanked.length; i++) {
      expect(eloRanked[i - 1].rating).toBeGreaterThanOrEqual(
        eloRanked[i].rating
      );
    }

    expect(response.statusCode).toBe(200);
  });
});
