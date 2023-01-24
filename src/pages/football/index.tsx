import React from 'react'
import LiveGameCard from '../../components/constants/LiveGameCard';
import MainLayout from '../../layouts/MainLayout'

const IndexFootball = () => {
  return (
		<MainLayout title='Football'>
			<div className='flex w-full flex-col mx-auto max-w-[800px]'>
				<LiveGameCard path='/match/23' />
			</div>
		</MainLayout>
	);
}

export default IndexFootball