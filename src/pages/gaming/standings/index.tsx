import GamingLayout from '@/layouts/GamingLayout';
import { Table } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { User } from '@prisma/client';
import axios from 'axios';
import React from 'react';
import { LuLoader2 } from 'react-icons/lu';

interface Standing {
  user: User;
  points: number;
}

const FootTableIndex = () => {
  const [standings, setStandings] = React.useState<Standing[]>([]);
  const [loading, setLoading] = React.useState(true);

  // api/fantasy/score/update-score
  const getStandings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/fantasy/score/standings');
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
                    First Name
                  </th>
                  <th align="left" className="p-2">
                    Last Name
                  </th>
                  <th align="left" className="p-2">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {standings.map((standing, i) => (
                  <tr key={standing.user.id}>
                    <td align="left" className="p-2">
                      {i + 1}
                    </td>
                    <td align="left" className="p-2">
                      {standing.user.firstName}
                    </td>
                    <td align="left" className="p-2">
                      {standing.user.lastName}
                    </td>
                    <td align="left" className="p-2">
                      {standing.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </GamingLayout>
  );
};

export default FootTableIndex;
