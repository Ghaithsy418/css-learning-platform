import { Redis } from '@upstash/redis';

interface RedisEnvConfig {
  url: string;
  token: string;
  urlSource: string;
  tokenSource: string;
}

function readRedisEnv(): RedisEnvConfig | null {
  const urlCandidates: Array<[string, string | undefined]> = [
    ['UPSTASH_REDIS_REST_URL', process.env.UPSTASH_REDIS_REST_URL],
    ['KV_REST_API_URL', process.env.KV_REST_API_URL],
  ];

  const tokenCandidates: Array<[string, string | undefined]> = [
    ['UPSTASH_REDIS_REST_TOKEN', process.env.UPSTASH_REDIS_REST_TOKEN],
    ['KV_REST_API_TOKEN', process.env.KV_REST_API_TOKEN],
  ];

  const urlEntry = urlCandidates.find(([, value]) => Boolean(value?.trim()));
  const tokenEntry = tokenCandidates.find(([, value]) =>
    Boolean(value?.trim()),
  );

  if (!urlEntry || !tokenEntry) return null;

  return {
    url: urlEntry[1]!.trim(),
    token: tokenEntry[1]!.trim(),
    urlSource: urlEntry[0],
    tokenSource: tokenEntry[0],
  };
}

let cachedRedis: Redis | null = null;
let cachedSignature: string | null = null;

export function getRedisClient(): Redis | null {
  const config = readRedisEnv();
  if (!config) return null;

  const signature = `${config.urlSource}:${config.url}|${config.tokenSource}:${config.token}`;
  if (cachedRedis && cachedSignature === signature) {
    return cachedRedis;
  }

  cachedRedis = new Redis({
    url: config.url,
    token: config.token,
  });
  cachedSignature = signature;
  return cachedRedis;
}

export function getRedisConfigurationErrorMessage() {
  return [
    'Redis not configured on Vercel.',
    'Set one of these env-var pairs:',
    '- UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN',
    '- KV_REST_API_URL + KV_REST_API_TOKEN',
  ].join(' ');
}

export function getRedisConfigurationSource() {
  const config = readRedisEnv();
  if (!config) return null;

  return {
    url: config.urlSource,
    token: config.tokenSource,
  };
}
