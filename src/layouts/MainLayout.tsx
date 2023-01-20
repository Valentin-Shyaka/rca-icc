import Head from "next/head";
import React from "react";
import Image from "next/image";
import NavBar from "../components/NavBar";
import EventLinks from "../components/EventLinks";
import { isContext } from "vm";
import Link from "next/link";
import { useRouter } from "next/router";
import Feed from "../components/Feed";


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
			
                
               
			<div className="w-full flex flex-col pl-20 pr-20 pt-10"> 
			 <div className="w-full  flex flex-col border-b-2 ">
					<NavBar/>
			</div>
			 <EventLinks/>
			 <div className="flex ">
				{props.children}
				<Feed/>
			</div>
			</div>
		</>
	);
};

export default MainLayout;
