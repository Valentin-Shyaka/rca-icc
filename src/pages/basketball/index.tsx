import React from 'react'
import MatchCard from '../../components/MatchCard';
import MainLayout from '../../layouts/MainLayout'

const IndexBasket = () => {
  return (
		<MainLayout>
			<h1 className='my-2 font-semibold'>Yesterday</h1>
			<div className='grid desktop:grid-cols-3 md:grid-cols-2 gap-3'>
				<MatchCard />
			</div>
		</MainLayout>
	);
}

export default IndexBasket;