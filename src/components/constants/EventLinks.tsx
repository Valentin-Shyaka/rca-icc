import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { events } from "../../utils/data";
import NavSlider from "./NavSlider";
// import { GiCakeSlice } from 'react-icons/gi'

const EventLinks = () => {
	const [active, setActive] = useState("");
	const router = useRouter();

	useEffect(() => {
		const { pathname } = router;
		const path = pathname.split("/")[1];
		setActive(path);
	}, [router]);

	const activeEventStyle =
		"w-full h-[40px] border-2 hover:bg-blue-200 border-[#2076F8] px-3 py-2 rounded rounded-full flex items-center gap-2 justify-center cursor-pointer text-white bg-[#2076F8]";
	const eventStyle =
		"w-full h-[40px] border-2 hover:bg-primary border-gray-300 px-3 py-2 rounded rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#303030]";
	return (
		<NavSlider>
			{/* <div className='w-full flex justify-center gap-6 p-4'> */}
			{events.map((item) => (
				<Link className=' w-full' href={`/${item.path}`} key={item.name}>
					<div
						className={` border-gray duration-500 ${
							active === item.name ? activeEventStyle : eventStyle
						}`}
					>
						<span className='font-bold text-2xl xl:text-md '>{item.icon}</span>
						<span className='font-medium text-md block capitalize '>
							{item.name}
						</span>
					</div>
				</Link>
			))}
			{/* </div> */}
		</NavSlider>
	);
};

export default EventLinks;
