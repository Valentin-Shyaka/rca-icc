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
      const userPrediction = req.body;
      const token = req.headers.authorization || req.cookies.token;
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
      const decoded = decodeToken(token);
      if (!decoded) return res.status(401).json({ error: 'Unauthorized' });

      // Game user
      const user = await prisma.user.findFirst({ where: { email: decoded?.email } });
      if (!user) return res.status(404).json({ error: 'User not found' });
      if (!user?.isGamer) {
        // make sure user a gamer
        await prisma.user.update({
          where: { id: user?.id },
          data: { isGamer: true },
        });
      }

      // Create user prediction
      const prediction = await prisma.userPrediction.create({
        data: {
          ...userPrediction,
          userId: user.id,
        },
      });
      res.status(201).json(prediction);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
