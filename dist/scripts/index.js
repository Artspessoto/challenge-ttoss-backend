"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prismaClient_1 = __importDefault(require("../database/prismaClient"));
const seed_1 = require("../seed");
async function addVideos() {
    const videosWithRating = seed_1.videos.map((video) => ({
        ...video,
        rating: 0,
    }));
    const result = await prismaClient_1.default.videos.createMany({
        data: videosWithRating,
    });
    console.info(`Added ${result.count} videos`, result);
}
addVideos();
