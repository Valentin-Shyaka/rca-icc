import React from 'react'

const NavBar = () => {
  return (
    <div className="w-full flex text-xl text-bold font-bold mb-2">
        <div className='bg-blue rounded-md w-12 text-center gap-4'>
        <p className='text-white font-sans'>ICC</p>
        </div>
        <p className='ml-1'>
            2023
        </p>
		
		<span className='ml-[80%] text-md text-grey font-normal'> FRI 20th Jan</span>
	</div>
  )
}

export default NavBar