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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const env_1 = require("./validations/env");
const app_1 = require("./app");
if (require.main === module) {
    const start = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield app_1.app.listen({ port: env_1.env.PORT, host: "0.0.0.0" });
            console.log("HTTP Server is running!");
        }
        catch (error) {
            app_1.app.log.error(error);
            process.exit(1);
        }
    });
    start();
}
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield app_1.app.ready();
        app_1.app.server.emit("request", req, res);
    });
}
