"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const errorHandler_1 = require("./utils/errorHandler");
const routes_1 = __importDefault(require("./routes"));
const cookiePlugin_1 = require("./plugins/cookiePlugin");
const jwtPlugin_1 = require("./plugins/jwtPlugin");
const ensuredAuthenticated_1 = require("./middlewares/ensuredAuthenticated");
const app = (0, fastify_1.default)();
exports.app = app;
(0, cookiePlugin_1.cookiePlugin)(app);
(0, jwtPlugin_1.jwtPlugin)(app);
app.addHook('preHandler', ensuredAuthenticated_1.ensuredAuthenticated);
app.register(routes_1.default);
app.setErrorHandler(errorHandler_1.errorHandler);
