import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import AppProvider from "../contexts/AppProvider";
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function MyApp({ Component, pageProps }: AppProps) {
	const [showChild, setShowChild] = useState(false);
	useEffect(() => {
		setShowChild(true);
	}, []);

	if (!showChild) {
		return null;
	}

	return (
		<>
			<Head>
				<title>RCA-ICC</title>
				<link rel='shortcut icon' href='/favicon.svg' type='image/x-icon' />
				<meta
					name='description'
					content='Welcome to RCA interclass Competion Website, where education and competition go hand in hand. Our school offers a wide range of interclass competitions in various xtracurricular activities to challenge and inspire our students to reach their full potential.'
				/>
				<meta
					name='title'
					property='og:title'
					content='RCA-ICC- Home of all RCA interclass Competitions'
				/>
				<meta
					name='description'
					property='og:description'
					content='Welcome to RCA interclass Competion Website, where education and competition go hand in hand. Our school offers a wide range of interclass competitions in various xtracurricular activities to challenge and inspire our students to reach their full potential.'
				/>
				<meta name='type' property='og:type' content='article' />
				<meta
					name='image'
					property='og:image'
					content='/images/interclass.png'
				/>
			</Head>
			<NextNProgress
				color='#ff7b35'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
			/>
			<AppProvider>
				<Component {...pageProps} />
			</AppProvider>
		</>
	);
}

export default MyApp;
