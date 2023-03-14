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
  const seotitle = title ?? "RCA-ICCC";
  const host = window.location.host;
  const protocol = window.location.protocol;
  const baseUrl = `${protocol}//${host}`;
  console.log(baseUrl, protocol);
  
  return (
    <>
      <Head>
        <title>{seotitle}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        {seo ? (
          <>
            <meta name="description" content={seo.description?.slice(0, 200)} />
            <meta property="og:title" content={seo.title} />
            <meta name="type" property="og:type" content="article" />
            <meta name="image" property="og:image"  content={`${baseUrl}//api/og?image=${seo.image}`} />
          </>
        ) : (
          <>
            <title>RCA-ICC</title>
            <meta
              name="description"
              content="Welcome to RCA interclass Competion Website, where education and competition go hand in hand. Our school offers a wide range of interclass competitions in various xtracurricular activities to challenge and inspire our students to reach their full potential."
            />
            <meta
              name="title"
              property="og:title"
              content="RCA-ICC- Home of all RCA interclass Competitions"
            />
            <meta
              name="description"
              property="og:description"
              content="Welcome to RCA interclass Competion Website, where education and competition go hand in hand. Our school offers a wide range of interclass competitions in various xtracurricular activities to challenge and inspire our students to reach their full potential."
            />
            <meta name="type" property="og:type" content="article" />
            <meta
              name="image"
              property="og:image"
              content={`${baseUrl}//api/og`}
            />
          </>
        )}
      </Head>
      <main className="w-full flex flex-col md:px-[2%] px-1 overflow-hidden h-screen">
        <div className="w-full flex flex-col border-b-2 border-gray">
          <Header />
        </div>
        <EventLinks />
        <div className="flex w-full h-full gap-x-2 overflow-hidden">
          <SideBar />
          <div className="flex flex-col w-full h-[full overflow-y-auto overflow-x-hidden">
            {props.isGeneral ? null : <CompNavBar />}
            <div className="flex flex-col h-[85vh] overflow-y-auto py-2 overflow-x-hidden">
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
