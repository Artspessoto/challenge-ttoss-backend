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
const VideoRepository_1 = __importDefault(require("../repositories/VideoRepository"));
const AppError_1 = require("../utils/AppError");
const videoSchema_1 = require("../validations/schemas/videoSchema");
class VideoService {
    constructor() {
        this.videoRepository = new VideoRepository_1.default();
    }
    listVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            const allVideos = yield this.videoRepository.list();
            return allVideos;
        });
    }
    listByRating() {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield this.videoRepository.listVideosOrderedByRating();
            return videos;
        });
    }
    getTwoVideos() {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield this.videoRepository.findTwoRandom();
            return videos;
        });
    }
    addVideo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, error } = videoSchema_1.videoSchema.safeParse(data);
            if (!success) {
                throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "), 400);
            }
            const existingVideo = yield this.videoRepository.findByUrl(data.url);
            if (existingVideo) {
                throw new AppError_1.AppError("Já existe um vídeo com essa URL.", 400);
            }
            const { title, url, src, rating } = data;
            const newVideo = yield this.videoRepository.create({
                title,
                url,
                src,
                rating,
            });
            return newVideo;
        });
    }
    updateVideoRating(url, newRating) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newRating < 0) {
                throw new AppError_1.AppError("Rating inválido!");
            }
            const updatedVideo = yield this.videoRepository.updateVideoRatingByUrl(url, newRating);
            return updatedVideo;
        });
    }
}
exports.default = VideoService;
