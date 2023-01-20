import React from 'react'
import Image from 'next/image'

const Feed = () => {
  return (
		<div className='flex flex-col gap-y-3'>
      <h1 className=' text-center font-semibold'>🔥 Trending</h1>
			<div className='w-[250px] float-right  border-2 border-gray h-[250px] rounded-md relative top-0 aspect-square'>
				<Image
					src={"/images/feedImage.png"}
					alt={"match feed"}
					width={250}
					height={50}
				/>
				<p className='font-md font-sans text-coolGray-500 text-left p-2 text-sm'>
					Match day 2 , both Y2 and Y1 are fighting for the pride, who,s gonna
					make it today? Let’s head to the stadium or keep this tab open .
				</p>
			</div>
		</div>
	);
}

export default Feed