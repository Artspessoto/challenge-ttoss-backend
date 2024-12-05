"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VideoRepository_1 = __importDefault(require("../repositories/VideoRepository"));
const AppError_1 = require("../utils/AppError");
const videoSchema_1 = require("../validations/schemas/videoSchema");
class VideoService {
    constructor() {
        this.videoRepository = new VideoRepository_1.default();
    }
    async listVideo() {
        const allVideos = await this.videoRepository.list();
        return allVideos;
    }
    async listByRating() {
        const videos = await this.videoRepository.listVideosOrderedByRating();
        return videos;
    }
    async getTwoVideos() {
        const videos = await this.videoRepository.findTwoRandom();
        return videos;
    }
    async addVideo(data) {
        const { success, error } = videoSchema_1.videoSchema.safeParse(data);
        if (!success) {
            throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "), 400);
        }
        const existingVideo = await this.videoRepository.findByUrl(data.url);
        if (existingVideo) {
            throw new AppError_1.AppError("Já existe um vídeo com essa URL.", 400);
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
    async updateVideoRating(url, newRating) {
        if (newRating < 0) {
            throw new AppError_1.AppError("Rating inválido!");
        }
        const updatedVideo = await this.videoRepository.updateVideoRatingByUrl(url, newRating);
        return updatedVideo;
    }
}
exports.default = VideoService;
