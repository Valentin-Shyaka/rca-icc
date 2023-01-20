import React from "react";
import Image from "next/image";

const LiveGameCard = () => {
	return (
		<div className='w-full h-fit border-2 border-gray rounded-md p-4 text-center relative flex justify-between items-center'>
			<div className='flex absolute top-2 left-2'>
				<span className='rounded-full bg-red-600 w-[10px] h-[10px] p-2'></span>
				<span className=' text-sm font-bold ml-1'>Live</span>
			</div>
			<div className='flex gap-3 align-middle text-center flex-col'>
				<div className='flex items-center'>
					<Image
						src={"/images/teamImage.svg"}
						alt='team1'
						width={30}
						height={20}
					/>
					<p className='p-8 text-md text-slate-700'>Y1</p>
				</div>
				<div className='p-2'>
					<span className='text-md font-bold text-sm'>34'</span>
					<span className='text-slate p-2 text-sm'>Jonas</span>
				</div>
			</div>
			<div className='flex flex-col gap-y-3'>
				<div className='flex items-center gap-x-4'>
					<span className='text-center align-middle text-2xl'>1</span>
					<span className=' text-sm text-slate-500 '>VS</span>
					<span className='text-center align-middle text-2xl'>3</span>
				</div>
				<span className=''>45'</span>
			</div>
			<div className='flex gap-3 align-middle text-center flex-col'>
				<div className='flex items-center'>
					<p className='p-8 text-md text-slate-700'>Y2</p>
					<Image
						src={"/images/teamImage2.svg"}
						alt='team1'
						width={30}
						height={20}
					/>
				</div>
				<div className='p-2'>
					<span className='text-slate p-2 text-sm'>Charles</span>
					<span className='text-md font-bold text-sm'>50'</span>
				</div>
			</div>
		</div>
	);
};

export default LiveGameCard;
