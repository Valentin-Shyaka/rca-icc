import Head from "next/head";
import React from "react";

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
			<div className=' w-full flex flex-col'>
                
                {props.children}</div>
		</>
	);
};

export default MainLayout;
