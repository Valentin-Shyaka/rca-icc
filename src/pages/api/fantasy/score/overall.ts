import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      let season = req.query.season as string | undefined;
      let seasonId = req.query.seasonId as string | undefined;
      console.log('query season', season);
      if (!season) {
        const res = await prisma.season.findFirst({
          where: {
            status: 'ACTIVE',
          },
        });
        season = res?.name;
        seasonId = res?.id;
      }
      console.log('season', season);
      if (!season) return res.status(404).json({ error: 'Season not found' });
      const score = await prisma.userOverallScore.findMany({
        where: {
          seasonId: seasonId,
        },
      });
      res.status(200).json({ data: score });
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.message });
    }
  }
}
