"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VideoService_1 = __importDefault(require("../services/VideoService"));
const videoSchema_1 = require("../validations/schemas/videoSchema");
const AppError_1 = require("../utils/AppError");
class VideoController {
    constructor() {
        this.videoService = new VideoService_1.default();
    }
    async create(req, reply) {
        const { success, error, data } = videoSchema_1.videoSchema.safeParse(req.body);
        if (!success) {
            throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "));
        }
        const { title, url, src, rating } = data;
        await this.videoService.addVideo({ title, url, src, rating });
        return reply.status(201).send({ message: "Vídeo adicionado 😎👍" });
    }
    async list(req, reply) {
        const allVideos = await this.videoService.listVideo();
        reply.status(200).send({ videos: allVideos });
    }
    async listByElo(req, reply) {
        const list = await this.videoService.listByRating();
        reply.status(200).send({ eloRanked: list });
    }
    async twoVideos(req, reply) {
        const videos = await this.videoService.getTwoVideos();
        reply.status(200).send({ video1: videos[0], video2: videos[1] });
    }
    async update(req, reply) {
        const { url, rating } = req.query;
        const formatRating = Number(rating);
        const video = await this.videoService.updateVideoRating(url, formatRating);
        reply.status(200).send({ updatedVideo: video });
    }
}
exports.default = VideoController;
