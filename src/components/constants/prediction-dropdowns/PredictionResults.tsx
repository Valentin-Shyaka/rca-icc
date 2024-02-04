import { calculateUserPoints } from '@/utils/funcs/predictor';
import { Match } from '@/utils/types/types1';
import { UserPrediction } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import PlayerCard from '../PlayerCard';
import { RefType } from '@/utils/types/types2';

interface Props {
  match: Match;
  userPrediction: UserPrediction | null | undefined;
}

const PredictionResults = ({ match, userPrediction }: Props) => {
  const isBasketball = match.category === 'basketball';
  const isFootball = match.category === 'football';
  const awayScore = isBasketball ? match.stats?.awayTeamStats?.points : match.stats?.awayTeamStats?.goals;
  const homeScore = isBasketball ? match.stats?.homeTeamStats?.points : match.stats?.homeTeamStats?.goals;

  const userScoreSummary = userPrediction ? calculateUserPoints(userPrediction, match) : null;
  const exactHomeScore =
    userPrediction?.prediction.homeScore === match.stats.homeTeamStats[isBasketball ? 'points' : 'goals'];
  const exactAwayScore =
    userPrediction?.prediction.awayScore === match.stats.awayTeamStats[isBasketball ? 'points' : 'goals'];
  const exactScore = exactHomeScore && exactAwayScore;

  const userHomeScorePoints = userScoreSummary?.components.correctHomeScore.points ?? 0;
  const userAwayScorePoints = userScoreSummary?.components.correctAwayScore.points ?? 0;

  // player fantasies
  const matchPlayers = match.homeTeam.players.concat(match.awayTeam.players);
  const manOfTheMatch = matchPlayers.find((player) => player._id === (match.fantasy.manOfTheMatch as RefType)?._ref);
  const userManOfTheMatch = matchPlayers.find((player) => player._id === userPrediction?.prediction.manOfTheMatch);
  const highestScorer = matchPlayers.find(
    (player) => player._id === (match.fantasy.highestScoringPlayer as RefType)?._ref,
  );
  const userHighestScorer = matchPlayers.find(
    (player) => player._id === userPrediction?.prediction.highestScoringPlayer,
  );

  // team fantasies
  const matchTeams = [match.homeTeam, match.awayTeam];
  const firstTeamToScore = matchTeams.find((team) => team._id === (match.fantasy.firstTeamToScore as RefType)?._ref);
  const userFirstTeamToScore = matchTeams.find((team) => team._id === userPrediction?.prediction.firstTeamToScore);

  return (
    <div className=" w-full flex-col flex gap-y-3">
      <span className=" text-center font-semibold">Prediction Results</span>
      <span className=" text-center font-semibold text-lg">
        You Scored {userPrediction?.points} Points in this match
      </span>
      <div className="flex w-full flex-col gap-y-2">
        <h1 className=" text-center font-semibold">
          1. Score Results ({userAwayScorePoints + userHomeScorePoints}
          &nbsp; Pts)
        </h1>
        <div className="flex gap-2 justify-center items-center ">
          <div className="flex gap-3 align-middle text-center flex-col">
            <div className="flex items-center gap-x-2">
              <Image src={match?.homeTeam.logo ?? '/images/teamImage.svg'} alt="team1" width={70} height={50} />
              <p className="text-md text-slate-700 font-semibold text-lg">{match?.homeTeam?.name}</p>
            </div>
          </div>
          <span className="border-2 grid place-items-center border-blue w-10 h-10 rounded-lg outline-none text-center font-bold">
            {homeScore}
          </span>
          <span className="border-2 grid place-items-center border-blue w-10 h-10 rounded-lg outline-none text-center font-bold">
            {awayScore}
          </span>
          <div className="flex gap-3 align-middle text-center flex-col">
            <div className="flex items-center gap-x-2">
              <p className="text-md text-slate-700 font-semibold text-lg">{match?.awayTeam?.name}</p>
              <Image src={match?.awayTeam.logo ?? '/images/teamImage2.svg'} alt="team1" width={70} height={50} />
            </div>
          </div>
        </div>
        <span className=" text-center font-semibold">
          You Said {userPrediction?.prediction.homeScore} - {userPrediction?.prediction.awayScore}
          &nbsp;{' '}
          {exactScore ? (
            <span className=" text-green-700 font-semibold">
              You've got it exactly right 🤩 ({userAwayScorePoints + userHomeScorePoints}
              Points)
            </span>
          ) : (
            <div className="flex flex-col font-medium">
              {isBasketball ? (
                <>
                  <span>
                    You were {userScoreSummary?.components.correctHomeScore.scoreAway} points away from the home team
                    score ({userHomeScorePoints} Points)
                  </span>
                  <span>
                    You were {userScoreSummary?.components.correctAwayScore.scoreAway} points away from the away team
                    score ({userAwayScorePoints} Points)
                  </span>
                </>
              ) : (
                <>
                  {exactHomeScore ? (
                    <span className=" text-green-700 font-semibold">
                      You've got the home team score exactly right 🤩 ({userHomeScorePoints} Points)
                    </span>
                  ) : (
                    <span className="text-red-700 font-semibold">
                      You've got the home team score wrong 😞 ({userHomeScorePoints} Points)
                    </span>
                  )}
                  {exactAwayScore ? (
                    <span className=" text-green-700 font-semibold">
                      You've got the home team score exactly right 🤩 ({userAwayScorePoints} Points)
                    </span>
                  ) : (
                    <span className="text-red-700 font-semibold">
                      You've got the home team score wrong 😞 ({userAwayScorePoints} Points)
                    </span>
                  )}
                </>
              )}
            </div>
          )}
        </span>
      </div>
      <div className="flex w-full flex-col gap-y-2">
        <h1 className=" text-center font-semibold">
          2. Man Of the Match ({userScoreSummary?.components.correctManOfTheMatch}
          &nbsp; Pts)
        </h1>
        <div className="flex flex-wrap max-w-[350px] w-full mx-auto justify-between mt-2 text-sm text-left p-2 ">
          <div className="flex flex-col gap-y-2 items-center">
            <h1 className=" font-semibold text-base">Actual Result</h1>
            {manOfTheMatch && <PlayerCard {...manOfTheMatch} />}
          </div>
          <div className="flex flex-col gap-y-2 items-center">
            <h1 className=" font-semibold text-base">You Said</h1>
            {userManOfTheMatch && <PlayerCard {...userManOfTheMatch} />}
          </div>
        </div>
        {userManOfTheMatch?._id === manOfTheMatch?._id ? (
          <span className=" text-center font-semibold text-green-700">
            You've got it exactly right 🤩 ({userScoreSummary?.components.correctManOfTheMatch} Points)
          </span>
        ) : (
          <span className=" text-center font-semibold text-red-700">
            You've got it wrong 😞 ({userScoreSummary?.components.correctManOfTheMatch} Points)
          </span>
        )}
      </div>
      {/* Highest Scorer For basketball */}
      {isBasketball && (
        <div className="flex w-full flex-col gap-y-2">
          <h1 className=" text-center font-semibold">
            3. Highest Scorer ({userScoreSummary?.components.correctHighestScoringPlayer}
            &nbsp; Pts)
          </h1>
          <div className="flex flex-wrap max-w-[350px] w-full mx-auto justify-between mt-2 text-sm text-left p-2 ">
            <div className="flex flex-col gap-y-2 items-center">
              <h1 className=" font-semibold text-base">Actual Result</h1>
              {highestScorer && <PlayerCard {...highestScorer} />}
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <h1 className=" font-semibold text-base">You Said</h1>
              {userHighestScorer && <PlayerCard {...userHighestScorer} />}
            </div>
          </div>
          {userHighestScorer?._id === highestScorer?._id ? (
            <span className=" text-center font-semibold text-green-700">
              You've got it exactly right 🤩 ({userScoreSummary?.components.correctHighestScoringPlayer} Points)
            </span>
          ) : (
            <span className=" text-center font-semibold text-red-700">
              You've got it wrong 😞 ({userScoreSummary?.components.correctHighestScoringPlayer} Points)
            </span>
          )}
        </div>
      )}
      {/* First team to score for football */}
      {isFootball && (
        <div className="flex w-full flex-col gap-y-2">
          <h1 className=" text-center font-semibold">
            3. First Team To Score ({userScoreSummary?.components.correctFirstTeamToScore}
            &nbsp; Pts)
          </h1>
          <div className="flex flex-wrap max-w-[350px] w-full mx-auto justify-between mt-2 text-sm text-left p-2 ">
            <div className="flex flex-col gap-y-2 items-center">
              <h1 className=" font-semibold text-base">Actual Result</h1>
              <div className="flex items-center gap-x-2">
                <Image src={firstTeamToScore?.logo ?? '/images/teamImage.svg'} alt="team1" width={70} height={50} />
                <p className="text-md text-slate-700 font-semibold text-lg">{firstTeamToScore?.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <h1 className=" font-semibold text-base">You Said</h1>
              <div className="flex items-center gap-x-2">
                <Image src={userFirstTeamToScore?.logo ?? '/images/teamImage.svg'} alt="team1" width={70} height={50} />
                <p className="text-md text-slate-700 font-semibold text-lg">{userFirstTeamToScore?.name}</p>
              </div>
            </div>
          </div>
          {firstTeamToScore?._id === userFirstTeamToScore?._id ? (
            <span className=" text-center font-semibold text-green-700">
              You've got it exactly right 🤩 ({userScoreSummary?.components.correctFirstTeamToScore} Points)
            </span>
          ) : (
            <span className=" text-center font-semibold text-red-700">
              You've got it wrong 😞 ({userScoreSummary?.components.correctFirstTeamToScore} Points)
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionResults;
