import React from 'react'
import LiveGameCard from '../../components/constants/LiveGameCard';
import MainLayout from '../../layouts/MainLayout'

const IndexFootball = () => {
  return (
		<MainLayout title='Football'>
			<main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
				<LiveGameCard />
			</main>
		</MainLayout>
	);
}

export default IndexFootball