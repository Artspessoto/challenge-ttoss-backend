import { FastifyReply, FastifyRequest } from "fastify";
import VideoService from "../services/VideoService";
import { videoSchema } from "../validations/schemas/videoSchema";
import { AppError } from "../utils/AppError";

class VideoController {
  private videoService: VideoService;

  constructor() {
    this.videoService = new VideoService();
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const { success, error, data } = videoSchema.safeParse(req.body);

    if (!success) {
      throw new AppError(error.errors.map((err) => err.message).join(", "));
    }

    const { title, url, src, rating } = data;

    await this.videoService.addVideo({ title, url, src, rating });

    return reply.status(201).send({ message: "Vídeo adicionado 😎👍" });
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const allVideos = await this.videoService.listVideo();

    reply.status(200).send({ videos: allVideos });
  }

  async listByElo(req: FastifyRequest, reply: FastifyReply) {
    const list = await this.videoService.listByRating();
    reply.status(200).send({ eloRanked: list });
  }

  async twoVideos(req: FastifyRequest, reply: FastifyReply) {
    const videos = await this.videoService.getTwoVideos();

    reply.status(200).send({ video1: videos[0], video2: videos[1] });
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { url, rating } = req.query as { url: string; rating: number };

    const formatRating = Number(rating);

    const video = await this.videoService.updateVideoRating(url, formatRating);
    reply.status(200).send({ updatedVideo: video });
  }
}

export default VideoController;
