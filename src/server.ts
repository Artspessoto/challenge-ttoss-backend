import { env } from "./validations/env";
import { app } from "./app";

const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    console.log("HTTP Server is running!");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();

export default app;
