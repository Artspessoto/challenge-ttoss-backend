"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const env_1 = require("./validations/env");
const app_1 = require("./app");
if (require.main === module) {
    const start = async () => {
        try {
            await app_1.app.listen({ port: env_1.env.PORT, host: "0.0.0.0" });
            console.log("HTTP Server is running!");
        }
        catch (error) {
            app_1.app.log.error(error);
            process.exit(1);
        }
    };
    start();
}
async function handler(req, res) {
    await app_1.app.ready();
    app_1.app.server.emit("request", req, res);
}
