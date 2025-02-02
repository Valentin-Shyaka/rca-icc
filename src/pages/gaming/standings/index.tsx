import { useUser } from '@/contexts/UserProvider';
import GamingLayout from '@/layouts/GamingLayout';
import { Standing } from '@/utils/types/fantasy.type';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import React from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import { TiChevronRight } from 'react-icons/ti';
import { LuLoader2 } from 'react-icons/lu';

const FootTableIndex = () => {
  const [standings, setStandings] = React.useState<Standing[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { user } = useUser();

  // api/fantasy/score/update-score
  const getStandings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/fantasy/score/overall');
      setStandings(response.data.data);
    } catch (error) {
      console.log(error);
      notifications.show({
        title: 'Error',
        message: 'An error occurred Getting Standings',
        color: 'red',
      });
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getStandings();
  }, []);

  const FormIndicator = ({ lastRank, currentRank }: { lastRank: number; currentRank: number }) => {
    console.log(lastRank, currentRank);
    if (lastRank === currentRank) {
      return <span className="text-xs w-4 aspect-square rounded-full bg-gray"></span>;
    }
    if (lastRank < currentRank) {
      return (
        <span className="text-xs w-4 aspect-square grid place-items-center rounded-full bg-green-500">
          <TiChevronRight className=" -rotate-90" />
        </span>
      );
    }
    if (lastRank > currentRank) {
      return (
        <span className="text-xs w-4 aspect-square grid place-items-center rounded-full text-white bg-red-500">
          <TiChevronRight className=" rotate-90" />
        </span>
      );
    }
    return null;
  };

  return (
    <GamingLayout title="Football - Table" isGeneral>
      <div className="p-3 gap-y-3">
        <h3 className=" text-center text-xl font-semibold">Fantasy Standings</h3>
        <div className="float-left mt-4 font-bold text-lg px-3">
          <h3>Standings</h3>
        </div>
        <div className="flex flex-col w-full items-center overflow-x-auto">
          {loading && (
            <h1 className="flex gap-2 flex-col items-center">
              <LuLoader2 className=" animate-spin" size={40} />
              Loading Standings...
            </h1>
          )}
          {!loading && standings.length === 0 && (
            <h1 className="flex gap-2 flex-col items-center text-sm">No Standings So Far. Will be available after</h1>
          )}
          {standings.length > 0 && (
            <table className="mt-2">
              <thead>
                <tr>
                  <th align="left" className="p-2">
                    Rank
                  </th>
                  <th align="left" className="p-2">
                    Name
                  </th>
                  <th align="left" className="p-2">
                    MP (Marked)
                  </th>
                  <th align="left" className="p-2">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {standings.map((standing, i) => {
                  const isMe = standing.user.mis_id === user?.id;
                  return (
                    <tr
                      key={standing.id}
                      className={` ${isMe ? 'bg-blue text- hover:text-black hover:bg-gray-100 text-white' : ''} ${i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                    >
                      <td align="left" className="p-2">
                        <div className="flex items-center gap-2">
                          {i + 1}.{' '}
                          <FormIndicator lastRank={standing.lastPosition} currentRank={standing.currentPosition} />
                        </div>
                      </td>
                      {/* <td align="left" className="p-2">
                      {standing.user.firstName}
                    </td> */}
                      <td align="left" className="p-2 capitalize">
                        {`${standing.user.firstName?.[0]}. ${standing.user.lastName}`}
                      </td>
                      <td align="left" className="p-2 capitalize">
                        {standing.matchesPredicted}
                      </td>
                      <td align="left" className="p-2">
                        {standing.score}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </GamingLayout>
  );
};

export default FootTableIndex;
