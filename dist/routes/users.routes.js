"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controllers/UserController"));
const ensuredAuthenticated_1 = require("../middlewares/ensuredAuthenticated");
const userController = new UserController_1.default();
async function usersRoutes(fastify) {
    fastify.post("/", async (req, reply) => {
        return userController.create(req, reply);
    });
    fastify.put("/", { preHandler: [ensuredAuthenticated_1.ensuredAuthenticated] }, (req, reply) => {
        return userController.update(req, reply);
    });
}
exports.default = usersRoutes;
