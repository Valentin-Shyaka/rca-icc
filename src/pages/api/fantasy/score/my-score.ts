import { getUserFromReq } from '@/lib/api';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const user = await getUserFromReq(req, res);
      if (!user) return res.status(404).json({ error: 'User not found' });
      const score = prisma.userPrediction.aggregate({
        _sum: {
          points: true,
        },
      });
      res.status(200).json(score);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
