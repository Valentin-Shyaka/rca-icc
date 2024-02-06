import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import PlayerCard from '../../components/constants/PlayerCard';
import MainLayout from '../../layouts/MainLayout';
import { fetchTeamByIdQuery } from '../../lib/query1';
import { Team } from '../../utils/types/types1';
import { useSanity } from '@/contexts/SanityProvider';
import { SEO } from '@/utils/types/misc';

const TeamIndex = () => {
  const { client } = useSanity();
  const router = useRouter();
  const { id } = router.query;
  const [team, setTeam] = React.useState<Team | null>(null);

  const getTeam = async () => {
    try {
      const team = await client?.fetch(fetchTeamByIdQuery(id as string));
      setTeam(team[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // const isFootball = team?.category === 'football';

  const seo: SEO = {
    title: team?.name,
    description: `Get to know more about ${team?.name}`,
    image: team?.logo,
  };

  React.useEffect(() => {
    if (id) {
      getTeam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <MainLayout isGeneral title={'Team' + ` - ${team?.name}`} seo={seo}>
      <h1 className=" text-center font-semibold text-lg">Team Details</h1>
      <div className=" w-full px-2 gap-y-3">
        <div className=" flex  border-2 border-gray rounded-md p-2 w-full gap-y-2 flex-col justify-center items-center ">
          <Image src={team?.logo || '/images/teamImage2.svg'} width={100} height={100} alt="" />
          <p className=" text-sm text-slate-500">Name: {team?.name}</p>
          <p className=" text-sm text-slate-500">Category: {team?.category}</p>
        </div>
        <h1 className="px-1 font-semibold text-lg mt-2">Stats</h1>
        <div className=" flex gap-2 flex-wrap  border-2 border-gray rounded-md p-2 mt-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-slate-500">Matches Played: {team?.stats?.matchesPlayed ?? 0}</p>
            <p className="text-sm text-slate-500">Wins: {team?.stats?.matchesWon ?? 0}</p>
            <p className="text-sm text-slate-500">Losses: {team?.stats?.matchesLost ?? 0}</p>
            <p className="text-sm text-slate-500">Draws: {team?.stats?.matchesDrawn ?? 'N/A'}</p>
            <p className="text-sm text-slate-500">Points: {team?.stats?.points ?? 0}</p>
            <p className="text-sm text-slate-500">Goal Scored: {team?.stats?.goalsScored ?? 'N/A'}</p>
            <p className="text-sm text-slate-500">Goal Conceded: {team?.stats?.goalsConceded ?? 'N/A'}</p>
          </div>
        </div>
        <h1 className="px-1 font-semibold text-lg mt-2">Players</h1>
        <div className=" flex gap-2 flex-wrap  border-2 border-gray rounded-md p-2 mt-2">
          <div className="flex gap-3 flex-wrap w-full mt-3">
            {team?.players.map((player, i) => <PlayerCard key={i} {...player} />)}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TeamIndex;
