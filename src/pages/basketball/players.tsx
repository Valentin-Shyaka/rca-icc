import PlayerCard from '../../components/constants/PlayerCard';
import MainLayout from '../../layouts/MainLayout';
import { playersBaccoQuery } from '../../lib/queries';
import { Player } from '../../utils/types/types1';
import { useSanity } from '@/contexts/SanityProvider';
import { useEffect, useState } from 'react';

type PlayerProps = {
  teamPlayers: Array<{
    _id: string;
    category: string;
    players: Player[];
    name: string;
  }>;
};

const PlayersIndex = () => {
  const [teamPlayers, setTeamPlayers] = useState<PlayerProps['teamPlayers']>([]);
  const { client } = useSanity();

  useEffect(() => {
    if (!client) return;
    const getPlayers = async () => {
      const teamPlayers = await client.fetch(playersBaccoQuery);
      setTeamPlayers(teamPlayers);
    };
    getPlayers();
  }, [client]);
  return (
    <MainLayout title="Basketball - Players">
      <div className="p-3 gap-y-3">
        <h1 className="px-3 font-semibold">Players</h1>
        {/* <div className='flex gap-3 flex-wrap w-full mt-3'>
					{players.map((player) => (
						<PlayerCard key={player._id} {...player} />
					))}
				</div> */}
        {teamPlayers.map((team) => (
          <div key={team._id}>
            <h1 className="px-3 font-semibold my-3">{team.name}</h1>
            <div className="flex gap-3 flex-wrap w-full mt-3">
              {team.players.map((player, i) => (
                <PlayerCard key={i} {...player} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default PlayersIndex;
