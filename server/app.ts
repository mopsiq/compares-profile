import fastify from "fastify";
import cors from "@fastify/cors";
import routes from "@fastify/routes";
import { steamRouter } from "./routers/steam/router.js";

const server = fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
})
  .register(cors)
  .register(routes)
  .register(steamRouter, { prefix: "api/steam" });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
