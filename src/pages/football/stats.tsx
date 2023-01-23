import React from 'react'
import Stats from '../../components/constants/Stats';
import MainLayout from '../../layouts/MainLayout'

const StatsIndex = () => {
  return (
		<MainLayout>
			<div className='p-3'>
                <Stats />
            </div>
		</MainLayout>
	);
}

export default StatsIndex