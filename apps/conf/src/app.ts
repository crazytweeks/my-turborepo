import sensible from "@fastify/sensible";
import fastify, { FastifyServerOptions } from "fastify";

import { connect } from "./lib/mongoose/db.js";

export const build = async (opts?: FastifyServerOptions) => {
  await connect();

  const app = fastify(opts);

  app.register(sensible);
  return app;
};
