import Image from "next/image";
import React from "react";
import { LineUp, Match } from "../../utils/types/types1";
import PlayerLineUp from "./PlayerLineUp";

type Props = {
	lineups: [LineUp, LineUp];
	isBasketball: boolean;
};

const LineUps = (props: Props) => {
	console.log(props.isBasketball);
	

	if (props.isBasketball) return <div className=" text-center">Not Available</div>;
	return (
		<div className=' w-full flex flex-col'>
			<div className='flex flex-col w-4/5 mx-auto bg-green-600 px-1'>
				<div className='flex items-center justify-between text-white bg-black/20 p-2 shadow-md'>
					<h1>Y1</h1>
					<h1>4-3-3</h1>
				</div>
				<div className='relative h-[120vh] w-full border-2 border-white'>
					<PlayerLineUp />
					<div className=' absolute border-white top-0 w-3/5 h-1/4 border-2 left-1/2 -translate-x-1/2 border-t-0'>
						<div className=' absolute border-white top-0 w-3/5 h-2/5 border-2  left-1/2 -translate-x-1/2 border-t-0'></div>
					</div>
					<hr className='absolute top-1/2 -translate-y-1/2 h-[2px] outline-none border-none bg-white w-full' />
					<div className=' absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/4 aspect-square rounded-full border-2 border-white'></div>
					<div className=' absolute border-white bottom-0 rotate-180 w-3/5 h-1/4 border-2 left-1/2 -translate-x-1/2 border-t-0'>
						<div className=' absolute border-white top-0 w-3/5 h-2/5 border-2  left-1/2 -translate-x-1/2 border-t-0'></div>
					</div>
				</div>
				<div className='flex items-center justify-between text-white bg-black/20 p-2 shadow-md'>
					<h1>TVET</h1>
					<h1>4-3-3</h1>
				</div>
			</div>
			<div className='flex flex-col w-4/5 mx-auto py-4'>
				<div className='flex w-full items-center justify-between'>
					<Image
						src={"/images/teamImage.svg"}
						alt='team1'
						width={30}
						height={20}
					/>
					<span className=' uppercase'>SUBSTITUTEs</span>
					<Image
						src={"/images/teamImage2.svg"}
						alt='team1'
						width={30}
						height={20}
					/>
				</div>
			</div>
		</div>
	);
};

export default LineUps;
