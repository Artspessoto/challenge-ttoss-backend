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
const VideoController_1 = __importDefault(require("../controllers/VideoController"));
const ensuredAuthenticated_1 = require("../middlewares/ensuredAuthenticated");
const videoController = new VideoController_1.default();
function videoRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/list", (req, reply) => __awaiter(this, void 0, void 0, function* () {
            return videoController.list(req, reply);
        }));
        fastify.get("/elo", (req, reply) => __awaiter(this, void 0, void 0, function* () {
            return videoController.listByElo(req, reply);
        }));
        fastify.get("/two", (req, reply) => __awaiter(this, void 0, void 0, function* () {
            return videoController.twoVideos(req, reply);
        }));
        fastify.post("/", { preHandler: [ensuredAuthenticated_1.ensuredAuthenticated] }, (req, reply) => __awaiter(this, void 0, void 0, function* () {
            return videoController.create(req, reply);
        }));
        fastify.patch("/update", (req, reply) => __awaiter(this, void 0, void 0, function* () {
            return videoController.update(req, reply);
        }));
    });
}
exports.default = videoRoutes;
