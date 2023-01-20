import React from 'react'
import Image from 'next/image'

const LiveGameCard = () => {
  return (
    <div className='w-full h-fit border-2 border-gray rounded-md p-2 text-center'>
        <div className='flex float-left p-2 '>
        <span className='rounded-full bg-red-600 w-[10px] h-[10px] p-2'></span>
        <span className=' text-sm font-bold ml-1'>Live</span>
        </div>
        <div className='flex text-center'>
        <div className='flex pl-10 pt-8 align-middle text-center'>
            <div className='pt-6'>
            <Image src={'/images/teamImage.svg'} alt='team1' width={30} height={20}/>
            <div className='p-2'>
                <span className='text-md font-bold text-sm'>34'</span>
                <span className='text-slate p-2 text-sm'>Jonas</span>
            </div>
            
            </div>
            <p className='p-8 text-md text-slate-700'>Y1</p>
            <span className='text-center align-middle text-2xl p-8'>1</span>
        </div>
        <div className='pt-16 pl-10'>
        <span className=' text-sm text-slate-500 '>VS</span>
        <span className='block pt-4'>45'</span>
        </div>
        <div className='flex pl-10 pt-8 align-middle text-center'>
        <span className='text-center align-middle text-2xl p-8'>3</span>
        <p className='p-8 text-md text-slate-700'>Y2</p>
        <div className='pt-6 '>
     
        <Image src={'/images/teamImage2.svg'} alt='team1' width={30} height={20} className='float-right mb-2'/>
        <div className='p-2'>
            <span className='text-slate p-2 text-sm'>Charles</span>
            <span className='text-sm font-bold'>34'</span>
        </div>
        
        
        </div>
        </div>
        </div>
        
    </div>
  )
}

export default LiveGameCard