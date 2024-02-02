import React from 'react';
import { useApp } from '@/contexts/AppProvider';
import MatchCard from '@/components/MatchCard';
import GamingLayout from '@/layouts/GamingLayout';
const GamingPage = () => {
  const { matches } = useApp();
  const footballMatchNS = matches?.filter((match) => match?.status.status === 'NS' && match?.category === 'football');
  console.log('footballMatchNS', footballMatchNS);
  console.log('matches', matches);

  return (
    <GamingLayout>
      <div className="">
        {footballMatchNS?.map((match) => <MatchCard key={match._id} {...match} />)}
        {footballMatchNS?.length == 0 && (
          <h1 className="font-bold text-center align-middle">There's no more matches to predict for football</h1>
        )}
      </div>
    </GamingLayout>
  );
};

export default GamingPage;
