import type { RedisOptions } from "ioredis";
import { Redis } from "ioredis";

import { config } from "../../config/config.js";

const redisConfig: RedisOptions = {
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  db: config.REDIS_DB,
};

const log = (message: string, level: "info" | "error" = "info") => {
  console.log(`[${level}] ${message}`);
};

const redis = new Redis(redisConfig);
const redisSubscriber = new Redis(redisConfig);

redisSubscriber.subscribe("test-channel");

redisSubscriber.on("message", (channel, message) => {
  log(`Received message ${message} from channel ${channel}`);
});

redis.on("error", (error) => {
  log(`Redis error: ${error}`, "error");
});

redis.on("ready", () => {
  log("Redis is ready");
});

export const redisClient = redis;
export const redisSubscriberClient = redisSubscriber;
