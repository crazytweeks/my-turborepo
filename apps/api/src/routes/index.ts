import { exampleRouter } from './example.js';
import { healthRouter } from './health.js';
import { _testRouter, router } from './trpc.js';

export const appRouter = router({
  health: healthRouter,
  example: exampleRouter,
});

export const testRouter = _testRouter({
  health: healthRouter,
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
