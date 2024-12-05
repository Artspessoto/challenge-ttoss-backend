"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../database/prismaClient"));
const AppError_1 = require("../utils/AppError");
class VideoRepository {
    async create(data) {
        const newVideo = prismaClient_1.default.videos.create({ data });
        return newVideo;
    }
    async list() {
        const allVideos = await prismaClient_1.default.videos.findMany();
        return allVideos;
    }
    async listVideosOrderedByRating() {
        const videos = await prismaClient_1.default.videos.findMany({
            orderBy: {
                rating: "desc",
            },
        });
        return videos;
    }
    async findByUrl(url) {
        const existingVideo = await prismaClient_1.default.videos.findFirst({
            where: { url },
        });
        return existingVideo;
    }
    async findTwoRandom() {
        const videos = await prismaClient_1.default.videos.findMany();
        if (videos.length < 2) {
            throw new AppError_1.AppError("Não há vídeos suficientes!");
        }
        const min = 0;
        const max = videos.length - 1;
        const random = (min, max) => {
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
    async updateVideoRatingByUrl(url, newRating) {
        const video = await prismaClient_1.default.videos.findFirst({
            where: { url },
        });
        if (!video) {
            throw new AppError_1.AppError("Vídeo não encontrado 😢", 404);
        }
        await prismaClient_1.default.videos.updateMany({
            where: { url },
            data: { rating: newRating },
        });
        const updatedVideo = await prismaClient_1.default.videos.findMany({
            where: { url },
        });
        return updatedVideo;
    }
}
exports.default = VideoRepository;
