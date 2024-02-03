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
      const userPredictions = await prisma.userPrediction.findMany({
        where: {
          seasonId: seasonId,
        },
        include: {
          user: true,
        },
      });
      // generate standings first find gamers and for each gamer calculate the total points then sort by points and push to standings
      const gamers = userPredictions.filter((userPrediction) => userPrediction.user.isGamer);
      const standings = gamers.map((gamer) => {
        const totalPoints = userPredictions
          .filter((userPrediction) => userPrediction.userId === gamer.userId)
          .reduce((acc, curr) => acc + curr.points, 0);
        return {
          user: gamer.user,
          points: totalPoints,
        };
      });
      const sortedStandings = standings.sort((a, b) => b.points - a.points);
      res.status(200).json({ data: sortedStandings });
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.message });
    }
  }
}
