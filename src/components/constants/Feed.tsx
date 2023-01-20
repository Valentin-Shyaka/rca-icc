import React from 'react'
import Image from 'next/image'

const Feed = () => {
  return (
    <div className='w-[250px] aspect-[5/6] border-2 border-gray h-[250px] rounded-md '>
      <Image src={'/images/feedImage.png'} alt={'match feed'} width={250} height={50}/>
      <p className='font-md font-sans text-coolGray-500 text-left p-2 text-sm'>Match day 2 , both Y2 and Y1 are fighting for the pride, who,s gonna make it today? Let’s head to the stadium or  keep this tab open .</p>


    </div>
  )
}

export default Feed