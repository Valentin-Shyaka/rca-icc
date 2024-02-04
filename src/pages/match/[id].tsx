import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import Moment from 'react-moment';
import LineUps from '../../components/Match/LineUps';
import Stats from '../../components/Match/Stats';
import Timeline from '../../components/Match/Timeline';
import { useApp } from '../../contexts/AppProvider';
import MainLayout from '../../layouts/MainLayout';
import { fetchMatchByIdQuery } from '../../lib/queries';
import { MatchGoals, SEO } from '../../utils/types/misc';
import { Match } from '../../utils/types/types1';
import { useSanity } from '@/contexts/SanityProvider';

const MatchPage = () => {
  const { client } = useSanity();
  const [match, setMatch] = useState<Match | null>(null);
  const [active, setActive] = useState('stats');
  const [goals, setGoals] = useState<MatchGoals>({ away: [], home: [] });
  const { players, getPlayers } = useApp();
  const router = useRouter();
  const { id } = router.query;

  const today = new Date();
  const dateMatch = new Date(match?.date ?? '');
  const isToday =
    dateMatch.getDate() === today.getDate() &&
    dateMatch.getMonth() === today.getMonth() &&
    dateMatch.getFullYear() === today.getFullYear();

  const hasStarted = match?.status?.status !== 'NS';

  const isBasketball = match?.category === 'basketball';

  const awayScore = isBasketball ? match?.stats?.awayTeamStats?.points : match?.stats?.awayTeamStats?.goals;
  const homeScore = isBasketball ? match?.stats?.homeTeamStats?.points : match?.stats?.homeTeamStats?.goals;

  const getMatch = async () => {
    const match = await client?.fetch(fetchMatchByIdQuery(id as string));
    // console.log(match);
    setMatch(match[0]);
  };

  useEffect(() => {
    if (!client) return;
    if (!players || players?.football.length === 0) {
      getPlayers!(client);
    }
    if (id) {
      getMatch();
    }
  }, [id, client]);

  useLayoutEffect(() => {
    const goalEvents = match?.events?.filter((event) => event.type === 'goal');
    const homeGoals: MatchGoals['home'] = [];
    const awayGoals: MatchGoals['away'] = [];
    if (players && players?.football.length > 0) {
      goalEvents?.forEach((event: any) => {
        const player = players?.football.find((player) => player._id === event.scorer?._ref);

        if (event.team === 'home') {
          console.log(event?.scorer?._ref);
          homeGoals.push({ ...event, scorer: player });
        } else {
          awayGoals.push({ ...event, scorer: player });
        }
      });
    }

    setGoals({ home: homeGoals, away: awayGoals });
  }, [match?.events, players]);

  const seo: SEO = {
    title: `${match?.homeTeam?.name} vs ${match?.awayTeam?.name}`,
    description: `${match?.homeTeam?.name} vs ${match?.awayTeam?.name}`,
    image: match?.banner,
  };

  const isLive = match?.status?.status === 'LIVE';

  return (
    <MainLayout isGeneral title={seo.title} seo={seo}>
      <div className={`flex px-2 flex-col tablet:w-4/5 max-w-[1000px] w-full shadow-md mx-auto`}>
        <div className="flex px-3 items-center justify-between w-full">
          <p className="text-violet-1000">
            <span className=" cursor-pointer capitalize">{match?.category}</span>
            <span className={`ml-2 text-orange`}>
              {isToday ? 'Today' : <Moment format="DD MMM">{match?.date}</Moment>}
            </span>
          </p>
          {<p className=" text-orange">{match?.status?.status}</p>}
        </div>
        <div className="flex px-4 py-4 max-w-[800px] w-full justify-between mx-auto mt-4">
          <div className="flex gap-3 align-middle text-center flex-col">
            <Link href={`/team/${match?.homeTeam._id}`} className="flex five:flex-row flex-col items-center gap-2">
              <Image src={match?.homeTeam.logo ?? '/images/teamImage.svg'} alt="team1" width={100} height={100} />
              <p className="text-md text-slate-700 text-xl font-semibold">{match?.homeTeam.name}</p>
            </Link>
            {hasStarted && !isBasketball && (
              <div className="flex flex-col gap-y-1">
                {goals.home.map((goal, i) => (
                  <div key={i} className=" gap-x-2">
                    <span className="text-md font-bold text-sm">{goal.time}'</span>
                    <span className="text-slate p-2 text-sm">{goal.scorer.displayName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-3 items-center">
            {hasStarted ? (
              <>
                <div className="flex items-center gap-x-4">
                  <span className="text-center align-middle text-2xl">{homeScore}</span>
                  <span className=" text-sm text-slate-500 ">-</span>
                  <span className="text-center align-middle text-2xl">{awayScore}</span>
                </div>
                <span className="">FT</span>
              </>
            ) : (
              <span className=" text-sm text-slate-500 my-auto ">VS</span>
            )}
          </div>
          <div className="flex gap-3 align-middle text-center flex-col">
            <Link
              href={`/team/${match?.awayTeam._id}`}
              className="flex five:flex-row flex-col-reverse items-center gap-2"
            >
              <p className="text-md text-slate-700 text-xl font-semibold">{match?.awayTeam.name}</p>
              <Image src={match?.awayTeam.logo ?? '/images/teamImage2.svg'} alt="team1" width={100} height={100} />
            </Link>
            {hasStarted && !isBasketball && (
              <div className="flex flex-col gap-y-1">
                {goals.away.map((goal, i) => (
                  <div key={i} className=" gap-x-2">
                    <span className="text-slate p-2 text-sm">{goal.scorer?.displayName ?? 'Own Goal'}</span>
                    <span className="text-md font-bold text-sm">{goal.time}'</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full overflow-x-auto shadow-md">
          <div className="w-full border-t-[1px] border-gray grid auto-cols-fr grid-flow-col mt-3 items-center shadow-md min-w-[350px]">
            <p
              onClick={() => setActive('timeline')}
              className={`px-6 py-2 hover:bg-slate-300/30 active:bg-slate-300/30 duration-300 cursor-pointer text-center ${
                active === 'timeline' && 'border-b-2  border-orange'
              }`}
            >
              TIMELINE
            </p>
            <p
              onClick={() => setActive('lineups')}
              className={`px-6 py-2 hover:bg-slate-300/30 cursor-pointer text-center ${
                active === 'lineups' && 'border-b-2  border-orange'
              }`}
            >
              LINEUPS
            </p>
            <p
              onClick={() => setActive('stats')}
              className={`px-6 py-2 hover:bg-slate-300/30 cursor-pointer text-center ${
                active === 'stats' && 'border-b-2  border-orange'
              }`}
            >
              STATS
            </p>
            {/* <p
							onClick={() => setActive("trendings")}
							className={`px-6 five:flex hidden py-2 hover:bg-slate-300/30 cursor-pointer text-center ${
								active === "trendings" && "border-b-2  border-orange"
							}`}
						>
							TRENDINGS
						</p> */}
          </div>
        </div>
        <div className="flex flex-col w-full py-3 ">
          {match && hasStarted ? (
            active === 'stats' ? (
              <Stats stats={match.stats} teams={[match?.homeTeam, match?.awayTeam]} />
            ) : active === 'lineups' ? (
              <LineUps
                lineups={[match?.homeTeamLineup, match?.awayTeamLineup]}
                homeTeam={match?.homeTeam}
                awayTeam={match?.awayTeam}
                isBasketball={isBasketball}
              />
            ) : (
              <Timeline timeline={match?.events} isBasketball={isBasketball} />
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <p className="text-xl text-slate-700 opacity-75">Match not started yet</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MatchPage;
