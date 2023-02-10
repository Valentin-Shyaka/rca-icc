import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	fetchMatchesQuery,
	teamsStatsQuery,
} from "../lib/queries";
import { AllPlayersStatsQuery, getInsightsQuery, getTrendsQuery } from "../lib/query1";
import { sanityClient } from "../lib/sanity";
import { Match, Team } from "../utils/types/types1";
import { Insight, PlayerByTeam, TeamGroups, Trend } from "../utils/types/types2";

export type AppContextType = {
	players?: PlayerByTeam;
	setPlayers?: React.Dispatch<React.SetStateAction<PlayerByTeam>>;
	matches?: Match[];
	setMatches?: React.Dispatch<React.SetStateAction<Match[]>>;
	getMatches?: () => void;
	teams?: TeamGroups;
	setTeams?: React.Dispatch<React.SetStateAction<TeamGroups>>;
	getPlayers?: () => void;
	trends?: Trend[];
	setTrends?: React.Dispatch<React.SetStateAction<Trend[]>>;
	insights?: Insight[];
	setInsights?: React.Dispatch<React.SetStateAction<Insight[]>>;
	getInsights?: () => void;
	friendlyMatches?: Match[];
	setFriendlyMatches?: React.Dispatch<React.SetStateAction<Match[]>>;
};

export const AppContext = createContext<AppContextType>({});
export const useApp = () => useContext(AppContext);

type Props = {
	children: ReactNode;
};

export default function AppProvider({ children }: Props) {
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

	const getMatches = async () => {
		try {
			const res = await sanityClient.fetch(fetchMatchesQuery);
			const leagueMatches = res.filter((match: Match) => match.type === "league");
			const friendlyMatches = res.filter((match: Match) => match.type === "friendly");
			setMatches(leagueMatches);
			setFriendlyMatches(friendlyMatches);
		} catch (error) {
			// console.log(error);
		}
	};

	const getTeams = async () => {
		try {
			const teams = await sanityClient.fetch(teamsStatsQuery);
			const officialTeams = teams.filter((team: Team) => team.isOfficial);
			
			const footballTeams = officialTeams.filter(
				(team: Team) => team.category === "football"
			);
			const basketballTeams = officialTeams.filter(
				(team: Team) => team.category === "basketball"
			);
			const volleyballTeams = officialTeams.filter(
				(team: Team) => team.category === "volleyball"
			);
			const pingpongTeams = officialTeams.filter(
				(team: Team) => team.category === "pingpong"
			);
			const debateTeams = officialTeams.filter(
				(team: Team) => team.category === "debate"
			);
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

	const getPlayers = async () => {
		try {
			const teamPlayers = await sanityClient.fetch(AllPlayersStatsQuery);
			const footballTeamPlayers = teamPlayers.filter(
				(player: Team) => player.category === "football"
			);
			const basketballTeamPlayers = teamPlayers.filter(
				(player: Team) => player.category === "basketball"
			);
			const pingpongTeamPlayers = teamPlayers.filter(
				(player: Team) => player.category === "pingpong"
			);
			const debateTeamPlayers = teamPlayers.filter(
				(player: Team) => player.category === "debate"
			);
			const volleyballTeamPlayers = teamPlayers.filter(
				(player: Team) => player.category === "volleyball"
			);
			const footballPlayers = footballTeamPlayers
				.map((team: Team) => team.players)
				.flat();
			const basketballPlayers = basketballTeamPlayers
				.map((team: Team) => team.players)
				.flat();

			setPlayers({
				...players,
				football: footballPlayers,
				basketball: basketballPlayers,
			});
		} catch (error) {
			// console.log(error);
		}
	};

	const getTrendings =async () => {
		try {
			const trendings = await sanityClient.fetch(getTrendsQuery);
			// console.log(trendings);
			setTrends(trendings);
		} catch (error) {
			console.log(error);
		}
	}

	const getInsights = async () => {
		try {
			const insights = await sanityClient.fetch(getInsightsQuery);
			setInsights(insights);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getMatches();
		getTeams();
		getTrendings();
	}, []);

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
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
