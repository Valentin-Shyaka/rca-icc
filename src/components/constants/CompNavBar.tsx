import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { compNavs } from "../../utils/data";

const CompNavBar = () => {
	const [path, setPath] = useState("");
	const router = useRouter();

	useEffect(() => {
		const { pathname } = router;
		const path = pathname;
		setPath(path);
	}, [router]);

	return (
		<div className=' w-full flex items-center overflow-x-auto font-medium text-lg'>
			{compNavs.map((nav, i) => {
				const isIndex = (path.split('/')[1] === router.pathname.split('/')[1]) && nav.name === "Overview" && router.pathname.split("/").length === 2;				
				const isActive = nav.path.split("/")[1] === path.split("/")[2] || isIndex;
				return (
					<Link
						key={i}
						href={`/${path.split("/")[1] + nav.path}`}
						className={`flex items-center justify-center border-b-2 p-3 ${
							isActive ? "text-orange border-orange" : "border-gray"
						} w-full cursor-pointer min-w-fit`}
					>
						<span className='text-base'>{nav.name}</span>
					</Link>
				);
			})}
		</div>
	);
};

export default CompNavBar;
