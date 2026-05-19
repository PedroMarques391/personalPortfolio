import redis from "@/redis/connection";

class CacheService {
  static async setCache<T>(key: string, value: T, ttl: number): Promise<void> {
    try {
      await redis.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error(
        `[cache-service] Error to save cache in key (${key}):`,
        error,
      );
    }
  }

  static async getCache<T>(key: string): Promise<T | null> {
    try {
      const value = await redis.get(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(
        `[cache-service] Error to get cache in key (${key}):`,
        error,
      );
      return null;
    }
  }

  static async invalidateCache(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(keys);
      }
    } catch (error) {
      console.error(
        `[cache-service] Error to invalidate cache in pattern (${pattern}):`,
        error,
      );
    }
  }
}

export default CacheService;
