import React from 'react';
import GamingLayout from '../../layouts/GamingLayout';
import { useApp } from '../../contexts/AppProvider';
import { competitions } from '../../utils/data/other';
import Link from 'next/link';
const GamingPage = () => {
  const { getMatches, matches, trends, friendlyMatches } = useApp();
  const gamingCOmps = competitions.filter((comp) => !comp.hideInGaming);
  return (
    <GamingLayout>
      <h1 className="text-center font-bold ">Welcome to the official RCA-ICC prediction !!</h1>
      <div className="flex flex-wrap gap-4 p-6">
        {gamingCOmps.map((comp, i) => (
          <Link
            href={`/gaming/${comp.name}`}
            key={comp.id}
            className=" border-2 hover:bg-divBack rounded-lg items-center w-full max-w-[250px] gap-3 border-gray flex flex-col gap-y-3 p-3"
          >
            {comp.icon}
            <h1 className="font-semibold capitalize">{comp.name}</h1>
          </Link>
        ))}
      </div>
    </GamingLayout>
  );
};

export default GamingPage;
