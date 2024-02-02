import { getUserFromReq } from '@/lib/api';
import prisma from '@/lib/prisma';
import { decodeToken } from '@/utils/funcs/fetch';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const predictions = await prisma.userPrediction.findMany({
        include: {
          user: true,
        },
      });
      res.status(200).json(predictions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { userPrediction, season } = req.body;
      // Game user
      const user = await getUserFromReq(req, res);
      if (!user) return res.status(404).json({ error: 'User not found' });
      if (!user?.isGamer) {
        // make sure user a gamer
        await prisma.user.update({
          where: { id: user?.id },
          data: { isGamer: true },
        });
      }

      // find season
      const _season = await prisma.season.findFirst({
        where: { name: season },
      });
      if (!_season) return res.status(404).json({ error: 'Season not found' });
      // if season is inactive
      if (_season.status === 'INACTIVE') return res.status(404).json({ error: 'Season is inactive' });
      // Create user prediction
      const prediction = await prisma.userPrediction.create({
        data: {
          matchId: userPrediction.matchId,
          userId: user.id,
          seasonId: _season.id,
          prediction: userPrediction.prediction,
        },
      });
      res.status(201).json(prediction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
