import { useState } from 'react';
import { BiSolidChevronUp } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { Team } from '../../utils/types/types1';

import Image from 'next/image';
interface Props {
  awayTeam: Team | undefined;
  homeTeam: Team | undefined;
}

const PredictionDropdown = ({ awayTeam, homeTeam }: Props) => {
  const [dropActive, setDropActive] = useState(false);
  // const id=team?._id ||"e3325bde-3101-465e-8d6a-d2de8afb8e59"
  // const [team, setTeam] = React.useState<Team | null>(null);
  //  const awayTeam= match.awayTeam
  //  const homeTeam= match.homeTeam
  //  const id=[homeTeam._id,awayTeam._id]

  // const getTeam = async () => {
  //   try {
  //     const team = await sanityClient.fetch(fetchTeamByIdQuery(id as string));
  //     setTeam(team[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // React.useEffect(() => {
  //   if (id) {
  //     getTeam();
  //   }
  // }, [id]);

  return (
    <div className=" max-sm:w-full h-fit p-2 border-b border-slate-300 cursor-pointer  ">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-sm text-warmGray-700">Player Of the Match</p>
        {dropActive ? (
          <div className="">
            <BiSolidChevronUp
              onClick={() => {
                setDropActive(!dropActive);
              }}
              className=" font-bold "
            />
          </div>
        ) : (
          <div className="bg-[#2076F8] p-1 rounded-lg">
            <FaPlus
              onClick={() => {
                setDropActive(!dropActive);
              }}
              className=" font-bold text-sm text-white"
            />
          </div>
        )}
      </div>
      {dropActive ? (
        <div>
          <div className="flex flex-wrap justify-between mt-2 text-sm text-slate-500 text-left bg-slate-100 p-2 ">
            {homeTeam?.players?.map((player, i) => (
              // <PlayerCard key={i} {...player} />
              <div key={i} className="gap-4">
                <Image width={80} height={60} alt="player profile" src={player?.profile} className="rounded-full" />
                <p className="font-bold text-center mt-2">{player?.displayName}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-between mt-2 text-sm text-slate-500 text-left bg-slate-100 p-2 ">
            {awayTeam?.players?.map((player, i) => (
              // <PlayerCard key={i} {...player} />
              <div key={i} className="gap-4">
                <Image width={80} height={60} alt="player profile" src={player?.profile} className="rounded-full" />
                <p className="font-bold text-center mt-2">{player?.displayName}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PredictionDropdown;
