import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";

const Header = () => {
	const router = useRouter();
	const [active, setActive] = useState("");
	const [path, setPath] = useState("");
	const { pathname } = router;

	useEffect(() => {
		
		const path = pathname.split("/")[1];
		setActive(path);
	}, [router]);

	
	const activeEventStyle =
		"w-full h-[40px] border-2 hover:bg-blue-200 border-[#2076F8] px-3 py-2 rounded rounded-full flex items-center gap-2 justify-center cursor-pointer text-white bg-[#2076F8]";
	const eventStyle =
    "w-full h-[40px] border-2 hover:bg-[#2076F8] hover:text-white border-gray-300 px-3 py-2 rounded rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#303030]";

	const isHome = pathname.split('/')[1] === "" && active === "";
	const isActive = pathname.split('/')[1] === active || isHome;
	
	return (
		<div className='w-full flex text-lg text-bold font-bold mb-2 justify-between h-[60px] items-center'>
			<Link href={'/'} className=' text-center gap-x-1 flex items-center'>
				<p className='text-white font-sans bg-blue rounded-md px-3 py-1'>ICC</p>
				<p className='ml-1'>2023</p>
			</Link>

			<span className=' text-grey font-normal truncate text-base'>
		      <Link href={'/gaming'}>
			  <div
							className={` border-gray ${
								isActive ? activeEventStyle : eventStyle
							}`}
						>
							<span className='font-medium text-md block capitalize '>
								Gaming
							</span>
						</div>
			  </Link>
			</span>
		</div>
	);
};

export default Header;
