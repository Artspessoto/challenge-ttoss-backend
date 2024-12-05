import prisma from "../database/prismaClient";
import { AppError } from "../utils/AppError";
import { Video } from "../validations/schemas/videoSchema";

class VideoRepository {
  async create(data: Video) {
    const newVideo = prisma.videos.create({ data });
    return newVideo;
  }

  async list() {
    const allVideos = await prisma.videos.findMany();
    return allVideos;
  }

  async findTwoRandom() {
    const videos = await prisma.videos.findMany();

    if (videos.length < 2) {
      throw new AppError("Não há vídeos suficientes!");
    }

    const min = 0;
    const max = videos.length - 1;

    const random = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const index1 = random(min, max);
    let index2 = random(min, max);

    while (index2 === index1) {
      index2 = random(min, max);
    }

    const firstVideo = videos[index1];
    const secondVideo = videos[index2];

    return [firstVideo, secondVideo];
  }
}

export default VideoRepository;
