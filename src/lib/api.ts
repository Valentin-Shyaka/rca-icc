import { decodeToken } from '@/utils/funcs/fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

export const getUserFromReq = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization || req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const decoded = decodeToken(token);
  if (!decoded) return res.status(401).json({ error: 'Unauthorized' });
  const user = await prisma.user.findFirst({ where: { email: decoded?.email } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  return user;
};
