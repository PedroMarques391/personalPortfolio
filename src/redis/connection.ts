import { createClient } from "redis";

type RedisClientType = ReturnType<typeof createClient>;

const globalForRedis = globalThis as unknown as {
  redisClient?: RedisClientType;
};

function createRedisClient(): RedisClientType {
  const url =
    process.env.REDIS_URL_REDIS_URL ||
    process.env.REDIS_URL ||
    "redis://127.0.0.1:6379";

  const client = createClient({
    url,
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 3) {
          console.warn(
            "[redis] Redis indisponível na porta 6379. Operando sem cache (fallback direto para o banco).",
          );
          return false;
        }
        return Math.min(retries * 200, 1000);
      },
    },
  });

  client.on("error", (err) => {
    if ((err as { code?: string })?.code !== "ECONNREFUSED") {
      console.error("[redis] Client Error:", err);
    }
  });

  client.connect().catch(() => {});

  return client;
}

const redis = globalForRedis.redisClient ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redisClient = redis;
}

export default redis;
