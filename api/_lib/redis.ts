import { Redis } from '@upstash/redis';

interface RedisEnvConfig {
  url: string;
  token: string;
  urlSource: string;
  tokenSource: string;
}

function normalizeEnvValue(raw: string | undefined) {
  if (!raw) return undefined;

  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim() || undefined;
  }

  return trimmed;
}

function readRedisEnv(): RedisEnvConfig | null {
  const upstashUrl = normalizeEnvValue(process.env.UPSTASH_REDIS_REST_URL);
  const upstashToken = normalizeEnvValue(process.env.UPSTASH_REDIS_REST_TOKEN);

  if (upstashUrl && upstashToken) {
    return {
      url: upstashUrl,
      token: upstashToken,
      urlSource: 'UPSTASH_REDIS_REST_URL',
      tokenSource: 'UPSTASH_REDIS_REST_TOKEN',
    };
  }

  const kvUrl = normalizeEnvValue(process.env.KV_REST_API_URL);
  const kvToken = normalizeEnvValue(process.env.KV_REST_API_TOKEN);

  if (kvUrl && kvToken) {
    return {
      url: kvUrl,
      token: kvToken,
      urlSource: 'KV_REST_API_URL',
      tokenSource: 'KV_REST_API_TOKEN',
    };
  }

  return null;
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

export function isRedisAuthOrConfigError(error: unknown) {
  const message =
    typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message?: unknown }).message ?? '')
      : '';

  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code ?? '')
      : '';

  const haystack = `${message} ${code}`.toLowerCase();

  return (
    haystack.includes('403') ||
    haystack.includes('unauthorized') ||
    haystack.includes('forbidden') ||
    haystack.includes('auth') ||
    haystack.includes('token') ||
    haystack.includes('permission') ||
    haystack.includes('invalid')
  );
}
