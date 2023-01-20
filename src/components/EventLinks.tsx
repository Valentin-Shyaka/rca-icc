import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const EventLinks = () => {

    const router= useRouter()
    const { gameEvent }= router.query;
    const events = [
		{
		  name: 'football',
		//   icon: <BsCode />,
		},
		{
		  name: 'basketball',
		//   icon: <BsEmojiSunglasses />,
		},
		{
		  name: 'volleyball',
		//   icon: <FaGamepad />,
		},
		{
		  name: 'debate',
		//   icon: <GiCakeSlice />,
		},
		{
		  name: 'pingpong',
		//   icon: <GiGalaxy />,
		},
		
	  ];
    

    const activeEventStyle='w-[200px] h-[40px] xl:border-2 hover:bg-blue-200 xl:border-[#2076F8] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-white bg-[#2076F8]';
    const eventStyle="w-[200px] h-[40px] xl:border-2 border-gray hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#303030]"
  return (
    <div className="w-full flex justify-center gap-6 p-4" >
    
    {events.map((item)=>(
        <Link href={`/?gameEvent=${item.name}`} key={item.name} >
             <div className={gameEvent === item.name? activeEventStyle : eventStyle}>
                <span className='font-bold text-2xl xl:text-md '>
                    {item.icon}
                </span>
                <span className='font-medium text-md hidden  xl:block capitalize '>
                    {item.name}
                </span>
            </div>
        </Link>
        
    ))}
   
    </div>
    
  )
}

export default EventLinks