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
const VideoService_1 = __importDefault(require("../services/VideoService"));
const videoSchema_1 = require("../validations/schemas/videoSchema");
const AppError_1 = require("../utils/AppError");
class VideoController {
    constructor() {
        this.videoService = new VideoService_1.default();
    }
    create(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, error, data } = videoSchema_1.videoSchema.safeParse(req.body);
            if (!success) {
                throw new AppError_1.AppError(error.errors.map((err) => err.message).join(", "));
            }
            const { title, url, src, rating } = data;
            yield this.videoService.addVideo({ title, url, src, rating });
            return reply.status(201).send({ message: "Vídeo adicionado 😎👍" });
        });
    }
    list(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const allVideos = yield this.videoService.listVideo();
            reply.status(200).send({ videos: allVideos });
        });
    }
    listByElo(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.videoService.listByRating();
            reply.status(200).send({ eloRanked: list });
        });
    }
    twoVideos(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield this.videoService.getTwoVideos();
            reply.status(200).send({ video1: videos[0], video2: videos[1] });
        });
    }
    update(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, rating } = req.query;
            const formatRating = Number(rating);
            const video = yield this.videoService.updateVideoRating(url, formatRating);
            reply.status(200).send({ updatedVideo: video });
        });
    }
}
exports.default = VideoController;
