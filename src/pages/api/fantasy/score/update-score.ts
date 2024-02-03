import prisma from '@/lib/prisma';
import { calCulatePoints } from '@/utils/funcs/predictor';
import { Match } from '@/utils/types/types1';
import { RefType } from '@/utils/types/types2';
import { NextApiRequest, NextApiResponse } from 'next';

// ! This is the method specified in sanity webhook. Be careful when changing it
/* 
 {_id,title,description,date,"homeTeam": homeTeam->{
        _id,
        name,
    },
    "awayTeam": awayTeam->{
        _id,
        name,
    },
    status,stats,fantasy,category,
} */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ! This is the method specified in sanity webhook. Be careful when changing it
  // ! Also change route name can cause error in the webhook
  // ! In sanity URL, the route name is specified as /api/fantasy/score/update-score. but can change
  // * I used ngrok to expose my localhost to the internet 😉
  if (req.method === 'PUT') {
    try {
      const { _id, title, description, date, homeTeam, awayTeam, status, stats, fantasy, category } = req.body as Match;
      console.log('Test Webhook!', {
        _id,
        title,
        description,
        date,
        homeTeam,
        awayTeam,
        status,
        stats,
        fantasy,
        category,
      });
      // If match is not finished, don't update the score
      if (status.status !== 'FT') {
        res.status(200).json({ message: 'Match not finished' });
        return;
      }

      const userPredictions = await prisma.userPrediction.findMany({
        where: {
          matchId: _id,
        },
      });
      //   map through the userPredictions and update the score (points) of each user
      userPredictions.map(async (userPrediction) => {
        const finalPoint = calCulatePoints(userPrediction, req.body as Match);
        await prisma.userPrediction.update({
          where: { id: userPrediction.id },
          data: {
            points: finalPoint.userPoints,
            status: 'MARKED',
          },
        });
      });
      res.status(200).json({ message: 'Score updated' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      res.status(200).json({ message: 'Score update webhook' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
