import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
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
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
