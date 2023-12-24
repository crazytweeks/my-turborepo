import cors from 'cors';
import express, { Application } from 'express';

import * as trpcExpress from '@trpc/server/adapters/express';

import { createContext } from './context';
import { publicProcedure, router } from './trpc';

const appRouter = router({
  helloWorld: publicProcedure.query(async () => {
    return "Hello World!";
  }),

  time: publicProcedure.subscription(async () => {
    return new Date().toISOString();
  })
});

export type AppRouter = typeof appRouter;

const app: Application = express();
app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  }),
);

const PORT: number = Number(process.env.PORT) || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
