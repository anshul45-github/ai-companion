import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export async function cachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  const cached = await redis.get(key);
  if (typeof cached === 'string') return JSON.parse(cached);

  const freshData = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(freshData));
  return freshData;
}