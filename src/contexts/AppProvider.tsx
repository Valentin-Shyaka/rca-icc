import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchMatchesQuery, teamsStatsQuery } from '../lib/queries';
import { AllPlayersStatsQuery, getInsightsQuery, getTrendsQuery } from '../lib/query1';
import { Match, Team } from '../utils/types/types1';
import { Insight, PlayerByTeam, TeamGroups, Trend } from '../utils/types/types2';
import { useSanity } from './SanityProvider';
import { SanityClient } from 'next-sanity';
import { SeasonData } from '@/utils/types';

export type AppContextType = {
  players?: PlayerByTeam;
  setPlayers?: React.Dispatch<React.SetStateAction<PlayerByTeam>>;
  matches?: Match[];
  setMatches?: React.Dispatch<React.SetStateAction<Match[]>>;
  getMatches?: (client: any) => void;
  teams?: TeamGroups;
  setTeams?: React.Dispatch<React.SetStateAction<TeamGroups>>;
  getPlayers?: (client: any) => void;
  trends?: Trend[];
  setTrends?: React.Dispatch<React.SetStateAction<Trend[]>>;
  insights?: Insight[];
  setInsights?: React.Dispatch<React.SetStateAction<Insight[]>>;
  getInsights?: (client: any) => void;
  friendlyMatches?: Match[];
  setFriendlyMatches?: React.Dispatch<React.SetStateAction<Match[]>>;
  getDataSeason?: <T = any>(data: SeasonData<T>) => T | undefined;
};

export const AppContext = createContext<AppContextType>({});
export const useApp = () => useContext(AppContext);

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const { client, dataSet } = useSanity();
  const [players, setPlayers] = useState<PlayerByTeam>({
    football: [],
    basketball: [],
    pingpong: [],
    debate: [],
    volleyball: [],
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [friendlyMatches, setFriendlyMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<TeamGroups>({
    football: [],
    basketball: [],
    pingpong: [],
    debate: [],
    volleyball: [],
  });
  const [trends, setTrends] = useState<Trend[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);

  const getMatches = async (client: SanityClient) => {
    try {
      const res = await client?.fetch(fetchMatchesQuery);
      const leagueMatches: Match[] = res.filter((match: Match) => match.type === 'league');
      const friendlyMatches = res.filter((match: Match) => match.type === 'friendly');
      setMatches(leagueMatches);
      setFriendlyMatches(friendlyMatches);
    } catch (error) {
      // console.log(error);
    }
  };

  const getTeams = async (client: SanityClient) => {
    try {
      const teams = await client?.fetch(teamsStatsQuery);
      const officialTeams = teams.filter((team: Team) => team.isOfficial);

      const footballTeams = officialTeams.filter((team: Team) => team.category === 'football');
      const basketballTeams = officialTeams.filter((team: Team) => team.category === 'basketball');
      const volleyballTeams = officialTeams.filter((team: Team) => team.category === 'volleyball');
      const pingpongTeams = officialTeams.filter((team: Team) => team.category === 'pingpong');
      const debateTeams = officialTeams.filter((team: Team) => team.category === 'debate');
      setTeams({
        football: footballTeams,
        basketball: basketballTeams,
        volleyball: volleyballTeams,
        pingpong: pingpongTeams,
        debate: debateTeams,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPlayers = async (client: SanityClient) => {
    try {
      const teamPlayers = await client?.fetch(AllPlayersStatsQuery);
      const footballTeamPlayers = teamPlayers.filter((player: Team) => player.category === 'football');
      const basketballTeamPlayers = teamPlayers.filter((player: Team) => player.category === 'basketball');
      const pingpongTeamPlayers = teamPlayers.filter((player: Team) => player.category === 'pingpong');
      const debateTeamPlayers = teamPlayers.filter((player: Team) => player.category === 'debate');
      const volleyballTeamPlayers = teamPlayers.filter((player: Team) => player.category === 'volleyball');
      const footballPlayers = footballTeamPlayers.map((team: Team) => team.players).flat();
      const basketballPlayers = basketballTeamPlayers.map((team: Team) => team.players).flat();

      setPlayers({
        ...players,
        football: footballPlayers,
        basketball: basketballPlayers,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const getTrendings = async (client: SanityClient) => {
    try {
      const trendings = await client?.fetch(getTrendsQuery);
      // console.log(trendings);
      setTrends(trendings);
    } catch (error) {
      console.log(error);
    }
  };

  const getInsights = async (client: SanityClient) => {
    try {
      const insights = await client?.fetch(getInsightsQuery);
      setInsights(insights);
    } catch (error) {
      console.log(error);
    }
  };

  const flush = () => {
    console.log('flushing data');
    setPlayers({
      football: [],
      basketball: [],
      pingpong: [],
      debate: [],
      volleyball: [],
    });
    setMatches([]);
    setTeams({
      football: [],
      basketball: [],
      pingpong: [],
      debate: [],
      volleyball: [],
    });
    setTrends([]);
    setInsights([]);
    setFriendlyMatches([]);
  };

  const getDataSeason = <T = any,>(data: SeasonData<T>) => {
    if (!dataSet) return;
    const dataSetData = data?.[dataSet];
    if (!dataSetData) {
      console.log('no data');
      return;
    }
    return dataSetData;
  };

  useEffect(() => {
    console.log('app provider', dataSet);
    console.log('client', client);
    if (!client) return;
    // flush data
    flush();
    // get data again
    getMatches(client);
    getTeams(client);
    getTrendings(client);
  }, [client]);

  return (
    <AppContext.Provider
      value={{
        players,
        setPlayers,
        matches,
        setMatches,
        getMatches,
        teams,
        setTeams,
        getPlayers,
        trends,
        setTrends,
        insights,
        setInsights,
        getInsights,
        friendlyMatches,
        setFriendlyMatches,
        getDataSeason,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
