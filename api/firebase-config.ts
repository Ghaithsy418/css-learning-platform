import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPublicFirebaseConfig } from './_lib/notifications';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const config = getPublicFirebaseConfig();
  if (
    !config.apiKey ||
    !config.authDomain ||
    !config.projectId ||
    !config.storageBucket ||
    !config.messagingSenderId ||
    !config.appId ||
    !config.vapidKey
  ) {
    return res
      .status(503)
      .json({ error: 'Firebase client config is incomplete' });
  }

  return res.json(config);
}
