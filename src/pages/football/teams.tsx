import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import TeamCard from '../../components/constants/TeamCard'

const TeamsIndex = () => {
  return (
		<MainLayout>
			<div className='w-full h-fit flex-wrap flex  '>
			<TeamCard/>
			<TeamCard/>
			<TeamCard/>
			<TeamCard/>
			</div>
		</MainLayout>
	);
}

export default TeamsIndex