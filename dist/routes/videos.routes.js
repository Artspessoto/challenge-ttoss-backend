"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VideoController_1 = __importDefault(require("../controllers/VideoController"));
const ensuredAuthenticated_1 = require("../middlewares/ensuredAuthenticated");
const videoController = new VideoController_1.default();
async function videoRoutes(fastify) {
    fastify.get("/list", async (req, reply) => {
        return videoController.list(req, reply);
    });
    fastify.get("/elo", async (req, reply) => {
        return videoController.listByElo(req, reply);
    });
    fastify.get("/two", async (req, reply) => {
        return videoController.twoVideos(req, reply);
    });
    fastify.post("/", { preHandler: [ensuredAuthenticated_1.ensuredAuthenticated] }, async (req, reply) => {
        return videoController.create(req, reply);
    });
    fastify.patch("/update", async (req, reply) => {
        return videoController.update(req, reply);
    });
}
exports.default = videoRoutes;
