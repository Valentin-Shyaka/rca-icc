export interface UserPrediction {
  prediction: Prediction;
  id: string;
  userId: string;
  matchId: string;
  status: string;
  points: number;
  seasonId: string;
  matchCategory: string;
}

export interface Prediction {
  manOfTheMatch: string;
  firstTeamToScore: string;
  homeScore: number;
  awayScore: number;
  highestScoringPlayer: string;
}
