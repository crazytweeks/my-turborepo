import dotenv from 'dotenv';
import path from 'node:path';
import z from 'zod';

import genOpensslRand from './genOpenssl.js';

const envFile = path.join(path.resolve(), ".env");
console.log('envFile: ', envFile);

const env = dotenv.config({ path: envFile });

const auth0ConfigSchema = z.object({
  AUTH0_SECRET: z.string().default(genOpensslRand(24)),
  AUTH0_BASE_URL: z.string(),
  AUTH0_ISSUER_BASE_URL: z.string(),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_AUDIENCE: z.string(),
  AUTH0_CLIENT_SECRET: z.string().default(genOpensslRand(24)),
});

const mongoDbConfigSchema = z.object({
  MONGODB_HOST: z.string(),
  MONGODB_PORT: z
    .string()
    .transform((val) => parseInt(val))
    .default("27017"),
  MONGODB_USER: z.string().default(""),
  MONGODB_PASSWORD: z.string().default(""),
  MONGODB_DB: z.string().default(""),
});

const redisConfigSchema = z.object({
  REDIS_HOST: z.string(),
  REDIS_PORT: z
    .string()
    .transform((val) => parseInt(val))
    .default("6379"),
  REDIS_PASSWORD: z.string().default(""),
  REDIS_DB: z
    .string()
    .transform((val) => parseInt(val))
    .default("0"),
});

const serverSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val))
    .default("8080"),
  JWT_SECRET: z.string().default(genOpensslRand(24)),
  LOGGING: z
    .string()
    .transform((val) => val === "true")
    .default("true"),
  BACKEND_URL: z.string().default("http://localhost:8080"),
  AUTH_URL: z.string().default("http://localhost:8000"),
});

const mergedSchema = redisConfigSchema
  .merge(serverSchema)
  .merge(mongoDbConfigSchema)
  .merge(auth0ConfigSchema)
  .catch((err) => {
    const errMsg = err.error.errors.map(
      (e) => `${e.path.join(".")} ${e.message}`
    );

    console.error(
      "\x1b[33m%s\x1b[0m", // yellow
      "Error: Invalid config. Please check your .env file or environment variables for the following errors:",
      errMsg
    );
    process.exit(1);
  });

const config = mergedSchema.parse(env.parsed);

export { config };
