import VideoRepository from "../repositories/VideoRepository";
import { AppError } from "../utils/AppError";
import { Video, videoSchema } from "../validations/schemas/videoSchema";

class VideoService {
  private videoRepository: VideoRepository;

  constructor() {
    this.videoRepository = new VideoRepository();
  }

  public async listVideo() {
    const allVideos = await this.videoRepository.list();
    return allVideos;
  }

  public async getTwoVideos() {
    const videos = await this.videoRepository.findTwoRandom();
    return videos;
  }

  public async addVideo(data: Video) {
    const { success, error } = videoSchema.safeParse(data);

    if (!success) {
      throw new AppError(
        error.errors.map((err) => err.message).join(", "),
        400
      );
    }

    const { title, url, src, rating } = data;

    const newVideo = await this.videoRepository.create({
      title,
      url,
      src,
      rating,
    });

    return newVideo;
  }
}

export default VideoService;
