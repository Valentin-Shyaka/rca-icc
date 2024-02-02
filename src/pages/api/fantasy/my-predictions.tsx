import prisma from '@/lib/prisma';
import { decodeToken } from '@/utils/funcs/fetch';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization || req.cookies.token;
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
      const decoded = decodeToken(token);
      if (!decoded) return res.status(401).json({ error: 'Unauthorized' });
      const user = await prisma.user.findFirst({ where: { email: decoded?.email } });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const data = await prisma.userPrediction.findMany({
        where: { userId: user.id },
      });
      return res.status(200).json({ data });
    } catch (error) {}
  }
}
