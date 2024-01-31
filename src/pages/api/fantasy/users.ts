import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await prisma.user.findMany();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
