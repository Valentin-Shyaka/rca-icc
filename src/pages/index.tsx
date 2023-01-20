import type { NextPage } from 'next'
import MainLayout from '../layouts/MainLayout'
import MatchCard from '../components/constants/MatchCard'
import Table from '../components/constants/Table';

const Home: NextPage = () => {
  return (
		<MainLayout title='Football'>
			<main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
				{/* <LiveGameCard/> */}
				{/* <MatchCard/> */}
				<Table/>
			</main>
		</MainLayout>
	);
}

export default Home;
