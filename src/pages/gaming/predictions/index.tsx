import React, { useEffect } from 'react';
import { useApp } from '@/contexts/AppProvider';
import MatchCard from '@/components/MatchCard';
import GamingLayout from '@/layouts/GamingLayout';
import GameMatchCard from '@/components/GameMatchCard';
import { Match } from '@/utils/types/types1';
const GamingPage = () => {
  const { matches, userPredictions } = useApp();
  const [predictedMatches, setPredictedMatches] = React.useState<Match[]>([]);

  useEffect(() => {
    const predictedMatches = matches?.filter((match) => {
      const userPrediction = userPredictions?.find((prediction) => prediction.matchId === match._id);
      return userPrediction;
    });
    if (predictedMatches === undefined) return;
    setPredictedMatches(predictedMatches);
  }, [matches, userPredictions]);

  return (
    <GamingLayout title="My Predictions" isGeneral>
      <div className="">
        {predictedMatches?.map((match) => <GameMatchCard key={match._id} {...match} />)}
        {predictedMatches?.length == 0 && (
          <h1 className="font-bold text-center align-middle">There's no matches predicted on yet </h1>
        )}
      </div>
    </GamingLayout>
  );
};

export default GamingPage;
