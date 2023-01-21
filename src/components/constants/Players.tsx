import React from 'react'
import Image from 'next/image'

const Players = () => {
  return (
    <div className='w-full h-fit '>
        <div className='float-left font-bold text-lg'>
            <h3>Players</h3>
        </div>
        <div className='w-full h-fit flex flex-wrap gap-4  p-4'>
            <div className='w-[120px] h-[180px] '>
                <Image src={'/images/player.png'} width={120} height={100} className='bg-gray '/>
                <p className='text-left font-bold '>N.charles</p>
                <p className='text-left font-bold text-slate-600 text-xs'>Y2 Coding F.C</p>

            </div> 
            

        </div>

    </div>
  )
}

export default Players