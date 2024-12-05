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

    const teste = await this.videoService.addVideo({ title, url, src, rating });

    return reply.status(201).send({ message: "Vídeo adicionado 😎👍"})
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const allVideos = await this.videoService.listVideo();

    reply.status(200).send({ videos: allVideos });
  }

  async twoVideos(req: FastifyRequest, reply: FastifyReply) {
    const videos = await this.videoService.getTwoVideos();

    reply.status(200).send({ video1: videos[0], video2: videos[1] });
  }
}

export default VideoController;
