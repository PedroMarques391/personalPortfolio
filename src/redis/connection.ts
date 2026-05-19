import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL_REDIS_URL || "redis://localhost:6379",
})
  .on("error", (err) => console.error("Redis Client Error", err))
  .on("connect", () => console.log("Connected to Redis"));

redis.connect();

export default redis;
