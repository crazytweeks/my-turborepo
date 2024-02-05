// import path from 'path';
import z from 'zod';
import genOpensslRand from './genOpenssl.js';
// const envFile = path.join(path.resolve(), ".env");
// dotenv.config({ path: envFile });
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
    TOKEN_SECRET: z.string().default("e"),
});
const env = process.env;
const redisConf = redisConfigSchema.parse(env);
const serverConf = serverSchema.parse(env);
const mongoDbConf = mongoDbConfigSchema.parse(env);
const auth0Conf = auth0ConfigSchema.parse(env);
const config = {
    ...redisConf,
    ...serverConf,
    ...mongoDbConf,
    ...auth0Conf,
};
export default config;
export { config };
