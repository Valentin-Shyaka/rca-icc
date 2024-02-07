import prisma from '@/lib/prisma';
import { calculateUserPoints } from '@/utils/funcs/predictor';
import { Match } from '@/utils/types/types1';
import { NextApiRequest, NextApiResponse } from 'next';

// ! This is the method specified in sanity webhook. Be careful when changing it and query below is returning the match object (one in sanity webhook)
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
      const { _id, status } = req.body as Match;

      //* If match is not finished, don't update the score
      if (status.status !== 'FT') {
        res.status(200).json({ message: 'Match not finished' });
        return;
      }
      const season = await prisma.season.findFirst({
        where: {
          status: 'ACTIVE',
        },
      });
      const seasonId = season?.id;
      if (!seasonId) return res.status(404).json({ message: 'No active season found' }); // * If no active season found, return 404
      // * Get all userPredictions for the match which are not marked
      const userPredictions = await prisma.userPrediction.findMany({
        where: {
          matchId: _id,
          status: 'NOT_MARKED',
        },
      });

      // *

      //* map through the userPredictions and update the score (points) of each user
      userPredictions.map(async (userPrediction) => {
        const finalPoint = calculateUserPoints(userPrediction, req.body as Match);
        await prisma.userPrediction.update({
          where: { id: userPrediction.id },
          data: {
            points: finalPoint.userPoints,
            status: 'MARKED',
          },
        });
      });

      console.log('=== Start updating standings ===');
      // * Making standings (userOverallScore).
      // first get all users with predictions for the active season
      const usersWithPredictions = await prisma.user.findMany({
        where: {
          UserPrediction: {
            some: {
              seasonId: season?.id,
            },
          },
        },
        include: {
          UserPrediction: true,
        },
      });

      console.log('===== Calculating user score ======');
      // calculate user score of the sum of predictions
      const standings = usersWithPredictions.map((user) => {
        const score = user.UserPrediction.reduce((acc, prediction) => {
          return acc + prediction.points;
        }, 0);
        const standing = {
          user_id: user.id,
          name: user.name,
          mis_id: user.mis_id,
          firstName: user.firstName,
          lastName: user.lastName,
          matchesPredicted: user.UserPrediction.filter((pre) => pre.status === 'MARKED').length,
          score,
        };
        return standing;
      });
      const sortedStandings = standings.sort((a, b) => b.score - a.score);

      console.log('==== Updating userOverallScore ====');
      // * Update the userOverallScore
      sortedStandings.forEach(async (standing, i) => {
        const rank = i + 1;
        const userOverallScore = await prisma.userOverallScore.findFirst({
          where: {
            userId: standing.user_id,
            seasonId,
          },
        });
        const isTheSameMatch = userOverallScore?.lastMatchId === _id;
        if (isTheSameMatch) return; // * If the match is already updated, don't update again

        if (userOverallScore) {
          console.log('=== Updating userOverallScore ===', standing.matchesPredicted);
          await prisma.userOverallScore.update({
            where: {
              id: userOverallScore.id,
            },
            data: {
              score: standing.score,
              matchesPredicted: standing.matchesPredicted,
              currentPosition: rank,
              lastPosition: userOverallScore.currentPosition || rank,
              lastMatchId: _id,
            },
          });
        } else {
          console.log('=== Creating new userOverallScore ===', standing.matchesPredicted);
          await prisma.userOverallScore.create({
            data: {
              score: standing.score,
              matchesPredicted: standing.matchesPredicted,
              currentPosition: rank,
              lastPosition: rank,
              lastMatchId: _id,
              seasonId,
              userId: standing.user_id,
            },
          });
        }
      });
      console.log('=== Standings updated ===');
      res.status(200).json({ message: 'Score updated', standings: sortedStandings });
    } catch (error: any) {
      console.error('error', error);
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
