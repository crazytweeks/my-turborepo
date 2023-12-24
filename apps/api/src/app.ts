import sensible from "@fastify/sensible";
import fastify, { FastifyServerOptions } from "fastify";

export const build = (opts?: FastifyServerOptions) => {
  const app = fastify(opts);

  app.register(sensible);
  return app;
};
