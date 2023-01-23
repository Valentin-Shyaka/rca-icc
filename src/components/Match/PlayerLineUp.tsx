import React from "react";

const PlayerLineUp = () => {
	return (
		<>
			<div className='h-1/2 w-full flex-col flex p-2 justify-between'>
				<div className='flex items-center justify-center'>
					<Player name='Player 1' color={`#ff7b35`} number='1' />
				</div>
				<div className='grid grid-cols-4 w-full'>
					<Player name='Player 2' color={`#ff7b35`} number='2' />
					<Player name='Player 3' color={`#ff7b35`} number='3' />
					<Player name='Player 4' color={`#ff7b35`} number='4' />
					<Player name='Player 5' color={`#ff7b35`} number='5' />
				</div>
				<div className='grid grid-cols-3 w-full'>
					<Player name='Player 6' color={`#ff7b35`} number='6' />
					<Player name='Player 7' color={`#ff7b35`} number='7' />
					<Player name='Player 8' color={`#ff7b35`} number='8' />
				</div>
				<div className='grid grid-cols-3 w-full'>
					<Player name='Player 9' color={`#ff7b35`} number='9' />
					<Player name='Player 10' color={`#ff7b35`} number='10' />
					<Player name='Player 11' color={`#ff7b35`} number='11' />
				</div>
			</div>
			<div className='h-1/2 w-full flex-col-reverse flex p-2 justify-between'>
				<div className='flex items-center justify-center'>
					<Player name='Player 1' color={`#000`} number='1' />
				</div>
				<div className='grid grid-cols-4 w-full'>
					<Player name='Player 2' color={`#000`} number='2' />
					<Player name='Player 3' color={`#000`} number='3' />
					<Player name='Player 4' color={`#000`} number='4' />
					<Player name='Player 5' color={`#000`} number='5' />
				</div>
				<div className='grid grid-cols-3 w-full'>
					<Player name='Player 6' color={`#000`} number='6' />
					<Player name='Player 7' color={`#000`} number='7' />
					<Player name='Player 8' color={`#000`} number='8' />
				</div>
				<div className='grid grid-cols-3 w-full'>
					<Player name='Player 9' color={`#000`} number='9' />
					<Player name='Player 10' color={`#000`} number='10' />
					<Player name='Player 11' color={`#000`} number='11' />
				</div>
			</div>
		</>
	);
};

export default PlayerLineUp;

const Player = ({ name, number, color }: any) => (
	<div className='flex flex-col items-center text-white mx-auto z-10 cursor-pointer'>
		<span
			style={{
				backgroundColor: color,
			}}
			className={`border-2 border-white w-11 aspect-square rounded-full flex items-center justify-center p-2`}
		>
			<span className=''>{number}</span>
		</span>
		<span className=''>{name}</span>
	</div>
);
