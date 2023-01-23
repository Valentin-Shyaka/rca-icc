import React from 'react'
import PlayerCard from '../../components/constants/PlayerCard';
import MainLayout from '../../layouts/MainLayout'

const PlayersIndex = () => {
  return (
		<MainLayout>
			<div className='p-3'>
                <h1 className="px-3 font-semibold">Players</h1>
                <div className="flex gap-3 flex-wrap w-full mt-3">
                    {new Array(50).fill(0).map(()=><PlayerCard key={Math.random()*1000} />)}
                </div>
            </div>
		</MainLayout>
	);
}

export default PlayersIndex