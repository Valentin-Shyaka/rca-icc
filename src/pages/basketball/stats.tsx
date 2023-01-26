import React, { useEffect } from "react";
import Stats from "../../components/constants/Stats";
import { useApp } from "../../contexts/AppProvider";
import MainLayout from "../../layouts/MainLayout";
import { mixArray } from "../../utils/funcs";
import { Player } from "../../utils/types/types1";

const StatsIndex = () => {
	const { players, getPlayers } = useApp();

	const baccoPlayers: Player[] = mixArray(players?.basketball!);
	const len = baccoPlayers.length;
	const withMostPoints = baccoPlayers
		?.slice(0, len)
		.sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
	const withMostAssits = baccoPlayers
		?.slice(0, len)
		.sort(
			(a, b) => ((b.basketballAssists ?? 0) - (a.basketballAssists ?? 0)) as any
		);

	const withMostRebounds = baccoPlayers
		?.slice(0, len)
		.sort((a, b) => ((b.rebounds ?? 0) - (a.rebounds ?? 0)) as any);

	useEffect(() => {
		if (!players || players.basketball.length === 0) {
			getPlayers!();
		}
	}, []);

	if (baccoPlayers.length === 0)
		return (
			<MainLayout>
				<div className='flex justify-center items-center h-screen'>
					Loading...
				</div>
			</MainLayout>
		);
	console.log(withMostPoints);
	return (
		<MainLayout>
			<div className='p-3 flex flex-col w-full gap-y-2'>
				<h3 className=' px-2 font-semibold text-lg mt-5'>Points</h3>
				{withMostPoints?.slice(0, 5)?.map((player, i) => {
					return (
						<div
							key={i}
							className='w-full border-b-2 border-gray  flex  gap-2 mt-5 justify-between'
						>
							<div className='flex items-center'>
								<span className='text-sm font-bold px-2'>{i + 1}.</span>
								<p className='text-sm font-bold'>{player.fullName}</p>
							</div>
							<div className=' bg-gray w-[30px] h-6 text-slate-700 rounded-md text-center'>
								<p className=' '>{player.points ?? 0}</p>
							</div>
						</div>
					);
				})}
				<h3 className=' px-2 font-semibold text-lg mt-5'>Assists</h3>
				{withMostAssits?.slice(0, 5)?.map((player, i) => {
					return (
						<div
							key={i}
							className='w-full border-b-2 border-gray  flex  gap-2 mt-5 justify-between'
						>
							<div className='flex items-center'>
								<span className='text-sm font-bold px-2'>{i + 1}.</span>
								<p className='text-sm font-bold'>{player.fullName}</p>
							</div>
							<div className=' bg-gray w-[30px] h-6 text-slate-700 rounded-md text-center'>
								<p className=' '>{player.basketballAssists ?? 0}</p>
							</div>
						</div>
					);
				})}
				<h3 className=' px-2 font-semibold text-lg mt-5'>Rebounds</h3>
				{withMostRebounds?.slice(0, 5)?.map((player, i) => {
					return (
						<div
							key={i}
							className='w-full border-b-2 border-gray  flex  gap-2 mt-5 justify-between'
						>
							<div className='flex items-center'>
								<span className='text-sm font-bold px-2'>{i + 1}.</span>
								<p className='text-sm font-bold'>{player.fullName}</p>
							</div>
							<div className=' bg-gray w-[30px] h-6 text-slate-700 rounded-md text-center'>
								<p className=' '>{player.rebounds ?? 0}</p>
							</div>
						</div>
					);
				})}
			</div>
		</MainLayout>
	);
};

export default StatsIndex;
