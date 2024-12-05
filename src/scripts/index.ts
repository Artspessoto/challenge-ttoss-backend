import "dotenv/config";
import prisma from "../database/prismaClient";
import { videos } from "../seed";

async function addVideos() {
  const videosWithRating = videos.map((video) => ({
    ...video,
    rating: 0,
  }));

  const result = await prisma.videos.createMany({
    data: videosWithRating,
  });

  console.info(`Added ${result.count} videos`, result);
}

addVideos();
