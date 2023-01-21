import type { NextPage } from 'next'
import MainLayout from '../layouts/MainLayout'
import MatchCard from '../components/MatchCard'

const Home: NextPage = () => {
  return (
		<MainLayout title='ICC - Home' isGeneral>
			<main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
				{/* <LiveGameCard/> */}
				<MatchCard/>
			</main>
		</MainLayout>
	);
}

export default Home;
