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
const UserController_1 = __importDefault(require("../controllers/UserController"));
const ensuredAuthenticated_1 = require("../middlewares/ensuredAuthenticated");
const userController = new UserController_1.default();
function usersRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/", (req, reply) => __awaiter(this, void 0, void 0, function* () {
            return userController.create(req, reply);
        }));
        fastify.put("/", { preHandler: [ensuredAuthenticated_1.ensuredAuthenticated] }, (req, reply) => {
            return userController.update(req, reply);
        });
        fastify.get("/", (req, reply) => __awaiter(this, void 0, void 0, function* () {
            return userController.list(req, reply);
        }));
    });
}
exports.default = usersRoutes;
