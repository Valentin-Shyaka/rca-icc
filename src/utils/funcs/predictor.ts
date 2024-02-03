import { UserPrediction } from '@prisma/client';
import { Match } from '../types/types1';
import { RefType } from '../types/types2';

export const calCulatePoints = (userPrediction: UserPrediction, match: Match) => {
  const { homeTeam, awayTeam, stats, fantasy, category } = match;
  const isBasketball = category === 'basketball';
  const isFootball = category === 'football';

  // Points handlers
  let userPoints = 0;
  let correctWinner = 0;
  let correctManOfTheMatch = 0;
  let correctFirstTeamToScore = 0;
  let correctHighestScoringPlayer = 0;
  let correctHomeScore = 0;
  let correctAwayScore = 0;
  //   let correctScore = 0;  // TODO: to be discussed later

  // compare score and update
  const homeTeamScore = isBasketball ? stats.homeTeamStats.points : stats.homeTeamStats.goals;
  const awayTeamScore = isBasketball ? stats.awayTeamStats.points : stats.awayTeamStats.goals;
  if (userPrediction.prediction.homeScore === homeTeamScore) {
    userPoints += 5;
    correctHomeScore = 5;
  }
  if (userPrediction.prediction.awayScore === awayTeamScore) {
    userPoints += 5;
    correctAwayScore = 5;
  }
  // if user predicted the correct winner + 5 points
  const winner = homeTeamScore > awayTeamScore ? homeTeam._id : awayTeam._id;
  const userWinner =
    userPrediction.prediction.homeScore > userPrediction.prediction.awayScore ? homeTeam._id : awayTeam._id;
  if (winner === userWinner) {
    userPoints += 5;
    correctWinner = 5;
  }
  // if user predicted the correct man of the match + 10 points
  if (userPrediction.prediction.manOfTheMatch === (fantasy.manOfTheMatch as RefType)._ref) {
    userPoints += 10;
    correctManOfTheMatch = 10;
  }
  // if user predicted the correct first team to score + 5 points and is football
  if (isFootball && userPrediction.prediction.firstTeamToScore === (fantasy.firstTeamToScore as RefType)._ref) {
    userPoints += 5;
    correctFirstTeamToScore = 5;
  }
  // if user predicted the correct highest scoring player + 5 points an is basketball
  if (
    isBasketball &&
    userPrediction.prediction.highestScoringPlayer === (fantasy.highestScoringPlayer as RefType)._ref
  ) {
    userPoints += 10;
    correctHighestScoringPlayer = 10;
  }
  return {
    userPoints,
    components: {
      correctWinner,
      correctManOfTheMatch,
      correctFirstTeamToScore,
      correctHighestScoringPlayer,
      correctHomeScore,
      correctAwayScore,
    },
  };
};
