"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../database/prismaClient"));
const AppError_1 = require("../utils/AppError");
class VideoRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newVideo = prismaClient_1.default.videos.create({ data });
            return newVideo;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const allVideos = yield prismaClient_1.default.videos.findMany();
            return allVideos;
        });
    }
    listVideosOrderedByRating() {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield prismaClient_1.default.videos.findMany({
                orderBy: {
                    rating: "desc",
                },
            });
            return videos;
        });
    }
    findByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingVideo = yield prismaClient_1.default.videos.findFirst({
                where: { url },
            });
            return existingVideo;
        });
    }
    findTwoRandom() {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield prismaClient_1.default.videos.findMany();
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
        });
    }
    updateVideoRatingByUrl(url, newRating) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prismaClient_1.default.videos.findFirst({
                where: { url },
            });
            if (!video) {
                throw new AppError_1.AppError("Vídeo não encontrado 😢", 404);
            }
            yield prismaClient_1.default.videos.updateMany({
                where: { url },
                data: { rating: newRating },
            });
            const updatedVideo = yield prismaClient_1.default.videos.findMany({
                where: { url },
            });
            return updatedVideo;
        });
    }
}
exports.default = VideoRepository;
