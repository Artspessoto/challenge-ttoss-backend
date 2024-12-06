import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import { FastifyInstance } from "fastify";
import { getTestJwt } from "../test-utils/getTestJwt";
import { isObject } from "util";
import { mockedUser } from "../test-utils/mockedUser";

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

  it("should return two videos with successful", async () => {
    const response = await server.inject({
      method: "GET",
      url: `${endpoint}/two`,
    });

    const responseBody = JSON.parse(response.body);

    const responseKeys = Object.keys(responseBody);
    expect(responseKeys).toEqual(["video1", "video2"]);

    const { video1, video2 } = responseBody;
    expect(video1).toHaveProperty("id");
    expect(video2).toHaveProperty("id");

    expect(response.statusCode).toBe(200);
  });

  it("Authenticated user should not create a video with an already existing url", async () => {
    const video = {
      title: "Teste do garibaldo",
      url: "https://www.youtube.com/watch?v=W5zHwWRILRI",
      src: "https://www.youtube.com/embed/W5zHwWRILRI?si=e3Xrjfj_5VD7LwHG",
      rating: 5,
    };

    const user = { id: mockedUser.id, email: mockedUser.email };

    const token = getTestJwt(user, server);

    const response = await server.inject({
      method: "POST",
      url: endpoint,
      body: video,
      headers: {
        authorization: `Bearer ${token}`,
      },
      cookies: {
        token: token,
      },
    });

    const responseBody = JSON.parse(response.body);

    expect(responseBody).toEqual({
      status: "Error",
      message: "Já existe um vídeo com essa URL.",
    });
  });
});
