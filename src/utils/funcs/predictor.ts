import { UserPrediction } from '@prisma/client';
import { Match } from '../types/types1';
import { RefType } from '../types/types2';

export const calCulatePoints = (userPrediction: UserPrediction, match: Match) => {
  const { homeTeam, awayTeam, stats, fantasy, category } = match;
  const isBasketball = category === 'basketball';
  const isFootball = category === 'football';

  // Points handlers
  let userPoints = 0;
  let correctOutcome = 0;
  let correctManOfTheMatch = 0;
  let correctFirstTeamToScore = 0;
  let correctHighestScoringPlayer = 0;
  let correctHomeScore = 0;
  let correctAwayScore = 0;
  let correctScore = 0; // TODO: to be discussed later

  // compare score and update
  const homeTeamScore = isBasketball ? stats.homeTeamStats.points : stats.homeTeamStats.goals;
  const awayTeamScore = isBasketball ? stats.awayTeamStats.points : stats.awayTeamStats.goals;
  if (userPrediction.prediction.homeScore === homeTeamScore) {
    userPoints += 6;
    correctHomeScore = 6;
  }
  if (userPrediction.prediction.awayScore === awayTeamScore) {
    userPoints += 6;
    correctAwayScore = 6;
  }
  // if user predicted the correct winner or correct draw + 5 points
  const winnerOrDraw =
    homeTeamScore === awayTeamScore ? 'draw' : homeTeamScore > awayTeamScore ? homeTeam._id : awayTeam._id;
  const userHomeScore = userPrediction.prediction.homeScore;
  const userAwayScore = userPrediction.prediction.awayScore;
  const userWinnerOrDraw =
    userHomeScore === userAwayScore ? 'draw' : userHomeScore > userAwayScore ? homeTeam._id : awayTeam._id;
  if (winnerOrDraw === userWinnerOrDraw) {
    userPoints += 5;
    correctOutcome = 5;
  }

  // if user predicted the correct score + 7 points
  if (userHomeScore === homeTeamScore && userAwayScore === awayTeamScore) {
    userPoints += 7;
    correctScore = 7;
  }

  // if user predicted the correct man of the match + 10 points
  if (userPrediction.prediction.manOfTheMatch === (fantasy.manOfTheMatch as RefType)._ref) {
    userPoints += 10;
    correctManOfTheMatch = 10;
  }
  // if user predicted the correct first team to score + 5 points and is football
  if (isFootball && userPrediction.prediction.firstTeamToScore === (fantasy.firstTeamToScore as RefType)._ref) {
    userPoints += 6;
    correctFirstTeamToScore = 6;
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
      correctOutcome,
      correctManOfTheMatch,
      correctFirstTeamToScore,
      correctHighestScoringPlayer,
      correctHomeScore,
      correctAwayScore,
      correctScore,
    },
  };
};
