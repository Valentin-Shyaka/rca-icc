import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '../layouts/MainLayout'

const Home: NextPage = () => {
  return (
		<MainLayout title='Football'>
			<main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
				RCA Interclass Competitions
			</main>
		</MainLayout>
	);
}

export default Home
