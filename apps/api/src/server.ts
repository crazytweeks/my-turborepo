import dotenv from 'dotenv';

import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import ws from '@fastify/websocket';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { build } from './app.js';
import { config } from './config/config.js';
import { env } from './config/env.js';
import { createContext } from './routes/context.js';
import { appRouter } from './routes/index.js';

const app = build({
  logger: config[env.NODE_ENV]?.logger
});

app.register(ws);
app.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  useWSS: true,
  trpcOptions: {
    router: appRouter,
    createContext,
  },
});

app.register(cors, {
  origin: "*",
  credentials: true,
});

app.register(helmet);

if (env.HOST) {
  app.listen(
    {
      port: env.PORT,
      host: env.HOST,
    },
    (err, _address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    }
  );
} else {
  app.listen(
    {
      port: env.PORT,
    },
    (err, _address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    }
  );
}
