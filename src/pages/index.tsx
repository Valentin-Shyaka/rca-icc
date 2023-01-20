import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import LiveGameCard from '../components/LiveGameCard'
import CompNavBar from '../components/constants/CompNavBar'
import SideBar from '../components/constants/SideBar'
import MainLayout from '../layouts/MainLayout'
import MatchCard from '../components/MatchCard'

const Home: NextPage = () => {
  return (
		<MainLayout title='Football'>
			<main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
				{/* <LiveGameCard/> */}
				<MatchCard/>
			</main>
		</MainLayout>
	);
}

export default Home
