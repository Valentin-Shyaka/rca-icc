import Head from "next/head";
import React from "react";
import Header from "../components/constants/NavBar";
import EventLinks from "../components/constants/EventLinks";
import Feed from "../components/constants/Feed";
import SideBar from "../components/constants/SideBar";
import CompNavBar from "../components/constants/CompNavBar";

type Props = {
	children: React.ReactNode;
	title?: string;
};

const MainLayout = (props: Props) => {
	return (
		<>
			<Head>
				<title>{props.title ?? "ICC"} </title>
			</Head>
			<div className='w-full flex flex-col px-[2%] h-screen'>
				<div className='w-full flex flex-col border-b-2 border-gray'>
					<Header />
				</div>
				<EventLinks />
				<div className='flex w-full h-full overflow-hidden '>
					<SideBar />
					<div className='flex flex-col w-full'>
						<CompNavBar />
						{props.children}</div>
					<Feed />
				</div>
			</div>
		</>
	);
};

export default MainLayout;
