import React from 'react'
import  Image from 'next/image';
import Link from 'next/link';

const MatchCard = () => {
  return (
    <Link href={'/match/12'} className="flex border-2 border-gray max-w-[300px] w-full h-[120px] rounded-md hover:bg-slate-100 duration-300 cursor-pointer">
        <div className='lg:p-6 p-3 flex justify-center gap-y-2 flex-col'>
            <div className='flex gap-2 text-center'>
                <Image src='./images/teamImage.svg' width={ 20 } height={ 10 } alt={ '' }/>
                <p className='text-slate text-sm font-bold' >Y1 Coding</p>
            </div>
            <div className='flex gap-2 text-center'>
                <Image src='./images/teamImage2.svg' width={ 20 } height={ 10 } alt={ '' }/>
                <p className='text-slate text-sm font-bold' >TVET L5</p>
            </div>
        </div>
        <span className='w-[1px] h-[80%] bg-gray mt-2'></span>
        <div className='lg:p-6 p-3 flex flex-col gap-y-2 justify-center'>
            <p className='text-sm font-bold'>Sat 21 Jan</p>
            <span>13:10</span>
        </div>
    </Link>
  )
}

export default MatchCard