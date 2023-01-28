import Head from "next/head";
import React from "react";
import Header from "../components/constants/Header";
import EventLinks from "../components/constants/EventLinks";
import Feed from "../components/constants/Feed";
import SideBar from "../components/constants/SideBar";
import CompNavBar from "../components/constants/CompNavBar";
import { SEO } from "../utils/types/misc";

type Props = {
	children: React.ReactNode;
	title?: string;
	trending?: any[];
	isGeneral?: boolean;
	seo?: SEO;
};

const MainLayout = (props: Props) => {
	const { title, seo } = props;
	return (
		<>
			<Head>
				<title>{title}</title>
				{seo && (
					<>
						<meta name='description' content={seo.description} />
						<meta property='og:title' content={seo.description} />
						<meta name='type' property='og:type' content='article' />
						<meta
							name='image'
							property='og:image'
							content={seo.image}
						/>
					</>
				)}
			</Head>
			<main className='w-full flex flex-col md:px-[2%] px-1 overflow-hidden h-screen'>
				<div className='w-full flex flex-col border-b-2 border-gray'>
					<Header />
				</div>
				<EventLinks />
				<div className='flex w-full h-full gap-x-2 overflow-hidden'>
					<SideBar />
					<div className='flex flex-col w-full h-[full overflow-y-auto overflow-x-hidden'>
						{props.isGeneral ? null : <CompNavBar />}
						<div className='flex flex-col h-[85vh] overflow-y-auto py-2 overflow-x-hidden'>
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
