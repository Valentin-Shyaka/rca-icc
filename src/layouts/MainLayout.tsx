import Head from "next/head";
import React from "react";
import Header from "../components/constants/Header";
import EventLinks from "../components/constants/EventLinks";
import Feed from "../components/constants/Feed";
import SideBar from "../components/constants/SideBar";
import CompNavBar from "../components/constants/CompNavBar";

type Props = {
	children: React.ReactNode;
	title?: string;
	trending?: any[];
	isGeneral?: boolean;
};

const MainLayout = (props: Props) => {
	const title = props.title;
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main className='w-full flex flex-col md:px-[2%] px-1 overflow-hidden h-screen'>
				<div className='w-full flex flex-col border-b-2 border-gray'>
					<Header />
				</div>
				<EventLinks />
				<div className='flex w-full h-full gap-x-2 overflow-hidden'>
					<SideBar />
					<div className='flex flex-col w-full h-[full overflow-y-auto'>
						{props.isGeneral ? null : <CompNavBar />}
						<div className='flex flex-col h-[78vh] overflow-y-auto py-2'>
							{props.children}
						</div>
					</div>
					<Feed />
				</div>
			</main>
		</>
	);
};

export default MainLayout;
