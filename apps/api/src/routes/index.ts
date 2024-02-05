import { exampleRouter } from "./example.js";
import { healthRouter } from "./health.js";
import { serverRouter } from "./server.js";
import { router } from "./trpc.js";
import { wpRouter } from "./wp.js";

export const appRouter = router({
  health: healthRouter,
  example: exampleRouter,
  server: serverRouter,
  wp: wpRouter,
});

export const procedures = appRouter._def.procedures;
export type AppRouter = typeof appRouter;
