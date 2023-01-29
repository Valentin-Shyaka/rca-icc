import React from "react";
import Image from "next/image";
import { useApp } from "../../contexts/AppProvider";

const Feed = () => {
	const { insights, getInsights } = useApp();

	React.useEffect(() => {
		getInsights!();
	}, []);
	return (
		<div className='flex-col gap-y-3 lg:flex hidden'>
			<h1 className=' text-center font-semibold'>Insights</h1>
			{insights?.map((insight) => (
				<div key={insight._id} className='w-[250px] float-right  border-2 border-gray h-[250px] rounded-md relative top-0 aspect-square'>
					<Image
						src={insight.image}
						alt={insight.title}
						className=" aspect-video object-cover h-full"
						width={250}
						height={50}
					/>
					<h1 className="font-semibold text-center">{insight.title}</h1>
					<p className='font-md font-sans text-coolGray-500 text-left p-2 text-sm'>
						{insight.description}
					</p>
				</div>
			))}
		</div>
	);
};

export default Feed;
