import { useUser } from '@/contexts/UserProvider';
import Head from 'next/head';
import React from 'react';
import EventLinks from '../components/constants/EventLinks';
import Feed from '../components/constants/Feed';
import GamingSidebar from '../components/constants/GamingSidebar';
import Header from '../components/constants/Header';
import { gamingEvents } from '../utils/data';
import { CompNav } from '../utils/types';
import { SEO } from '../utils/types/misc';
import { useRouter } from 'next/router';
import LoadingView from '@/components/other/LoadingView';

type Props = {
  children: React.ReactNode;
  title?: string;
  trending?: any[];
  isGeneral?: boolean;
  seo?: SEO;
  routes?: CompNav[];
};

const GamingLayout = (props: Props) => {
  const { user } = useUser();
  const { title, seo } = props;
  const seoTitle = title ?? 'RCA-ICC';
  const host = window.location.host;
  const protocol = window.location.protocol;
  const baseUrl = `${protocol}//${host}`;
  console.log(baseUrl, protocol);
  const router = useRouter();

  if (!user) {
    router.push('/auth/login');
    return <LoadingView />;
  }
  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        {seo ? (
          <>
            <meta name="description" content={seo.description?.slice(0, 200)} />
            <meta property="og:title" content={seo.title} />
            <meta name="type" property="og:type" content="article" />
            <meta name="image" property="og:image" content={`${baseUrl}//api/og?image=${seo.image}`} />
          </>
        ) : (
          <>
            <title>RCA-ICC</title>
            <meta
              name="description"
              content="Welcome to RCA interclass Competition Website, where education and competition go hand in hand. Our school offers a wide range of interclass competitions in various xtracurricular activities to challenge and inspire our students to reach their full potential."
            />
            <meta name="title" property="og:title" content="RCA-ICC- Home of all RCA interclass Competitions" />
            <meta
              name="description"
              property="og:description"
              content="Welcome to RCA interclass Competition Website, where education and competition go hand in hand. Our school offers a wide range of interclass competitions in various xtracurricular activities to challenge and inspire our students to reach their full potential."
            />
            <meta name="type" property="og:type" content="article" />
            <meta name="image" property="og:image" content={`${baseUrl}//api/og`} />
          </>
        )}
      </Head>
      <main className="w-full z-50 flex flex-col md:px-[2%] px-1 overflow-hidden h-screen">
        <div className="w-full flex flex-col border-b-2 border-gray">
          <Header />
        </div>
        <EventLinks routes={gamingEvents} />
        <div className="flex w-full h-full gap-x-2 overflow-hidden">
          <GamingSidebar />
          <div className="flex flex-col w-full h-[full overflow-y-auto overflow-x-hidden">
            {/* {props.isGeneral ? null : <CompNavBar />} */}
            <div className="flex flex-col h-[85vh] overflow-y-auto py-2 overflow-x-hidden">{props.children}</div>
          </div>
          <Feed />
        </div>
      </main>
    </>
  );
};

export default GamingLayout;
