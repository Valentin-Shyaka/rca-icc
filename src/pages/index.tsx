import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { BiFootball } from "react-icons/bi";
import MatchCard from "../components/MatchCard";
import { useApp } from "../contexts/AppProvider";
import MainLayout from "../layouts/MainLayout";
import { competitions } from "../utils/data/other";

const Home: NextPage = () => {
	const { getMatches, matches, trends } = useApp();

	const finishedMatches = matches?.filter(
		(match) => match?.status?.status === "FT"
	);
	const unfinishedMatches = matches?.filter(
		(match) => match.status?.status !== "FT"
	);
	const upComingMatches = unfinishedMatches?.slice(0, 5);

	return (
		<MainLayout title='ICC - Home' isGeneral>
			<main className='flex w-full flex-1 flex-col p-2 gap-y-3 overflow-x-hidden'>
				<div className='flex flex-col border-2 rounded-md p-2 border-gray'>
					<h1 className='text-lg font-semibold'>RCA Interclasses Are Back</h1>
					<div className='flex w-full md:flex-row flex-col-reverse mt-4 gap-3'>
						<div className='flex flex-col min-w-1/2 justify-between '>
							<p className=''>
								Rwanda Coding academy has been perfect and excellent in
								education and not to forget extra-curricular activities. From
								the beginning of RCA , interclasses have been a challenging
								league since a difference in age encourages minors to win
								majors. Teams are forced to make their way to the stage to
								receive their prizes in many hard duels with harder opponents.
								Here it comes again! It's 2022-2023.
							</p>
							{/* <button className='w-fit mt-4 px-3 py-2 text-blue flex items-center hover:text-[#1a44da] duration-300 rounded-md'>
								See live matches <span className='ml-2 mt-1'>{">>"}</span>
							</button> */}
						</div>
						<Image
							src={"/images/interclass.png"}
							alt=''
							className=' object-cover md:w-1/2 w-full aspect-video'
							height={250}
							width={500}
						/>
					</div>
				</div>
				<div className='flex flex-col border-2 rounded-md p-2 border-gray'>
					<h1 className='text-xl font-semibold'>Latest Results</h1>
					<div className='flex w-full mt-4 flex-wrap gap-3'>
						{finishedMatches?.map((match, i) => (
							<MatchCard key={match._id} {...match} />
						))}
					</div>
				</div>
				<div className='flex flex-col border-2 rounded-md p-2 border-gray'>
					<h1 className='text-xl font-semibold'>Upcoming Matches</h1>
					<div className='flex w-full mt-4 flex-wrap gap-2'>
						{upComingMatches?.map((match, i) => (
							<MatchCard key={match._id} {...match} />
						))}
					</div>
					<Link
						href={"/football/fixtures"}
						className='w-fit mt-4 px-3 py-2 text-blue flex items-center hover:text-[#1a44da] duration-300 rounded-md'
					>
						See All Fixtures<span className='ml-2 mt-1'>{">>"}</span>
					</Link>
				</div>
				<div className='flex flex-col border-2 rounded-md p-2 border-gray gap-y-3'>
					<h1 className='text-xl font-semibold'>Trendings</h1>
					{trends?.map((trend) => (
						<div key={trend._id} className='flex flex-col gap-y-3 w-full'>
							<h1 className='text-lg font-semibold'>{trend.title}</h1>
							<div className='flex md:flex-row flex-col w-full'>
								<Image
									className=' w-full object-cover md:w-1/2'
									src={trend.image}
									alt={trend.title}
									width={1920}
									height={1080}
								/>
								<div className="flex flex-col w-1/2">
								<p className=''>
									{trend.description.slice(0, 200) + "..."}
								</p>
								<Link
									href={`/trends/${trend._id}`}
									className='w-fit mt-4 px-3 py-2 text-blue flex items-center hover:text-[#1a44da] duration-300 rounded-md'
								>
									See More<span className='ml-2 mt-1'>{">>"}</span>
								</Link></div>
							</div>
						</div>
					))}
				</div>
				<div className='flex flex-col border-2 rounded-md p-2 border-gray'>
					<h1 className='text-xl font-semibold'>Competitions</h1>
					<div className='flex w-full mt-4 flex-wrap gap-3'>
						{competitions.map((comp, i) => (
							<Link
								href={`/${comp.name}`}
								key={comp.id}
								className=' border-2 hover:bg-divBack items-center w-full max-w-[250px] gap-3 border-gray flex flex-col gap-y-3 p-3'
							>
								{comp.icon}
								<h1 className='font-semibold capitalize'>{comp.name}</h1>
							</Link>
						))}
					</div>
					{/* <Link
						href={"/football/fixtures"}
						className='w-fit mt-4 px-3 py-2 text-blue flex items-center hover:text-[#1a44da] duration-300 rounded-md'
					>
						See All Fixtures<span className='ml-2 mt-1'>{">>"}</span>
					</Link> */}
				</div>
			</main>
		</MainLayout>
	);
};

export default Home;
