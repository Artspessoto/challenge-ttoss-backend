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

  public async listByRating(){
    const videos = await this.videoRepository.listVideosOrderedByRating();
    return videos;
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

    const existingVideo = await this.videoRepository.findByUrl(data.url);

    if (existingVideo) {
      throw new AppError("Já existe um vídeo com essa URL.", 400);
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

  public async updateVideoRating(url: string, newRating: number) {
    if (newRating < 0) {
      throw new AppError("Rating inválido!");
    }

    const updatedVideo = await this.videoRepository.updateVideoRatingByUrl(
      url,
      newRating
    );
    return updatedVideo;
  }
}

export default VideoService;
