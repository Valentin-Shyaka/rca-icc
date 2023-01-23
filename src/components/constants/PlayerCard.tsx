import React from "react";
import Image from "next/image";

const PlayerCard = () => {
	return (
		<div className='w-[120px] h-[180px] cursor-pointer'>
			<Image
				src={"/images/player.png"}
				width={120}
				height={100}
				className='bg-gray '
				alt=''
			/>
			<p className='text-left font-bold '>N.charles</p>
			<p className='text-left font-bold text-slate-600 text-xs'>
				Y2 Coding F.C
			</p>
		</div>
	);
};

export default PlayerCard;
