import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { getTrendById } from '../../lib/query1';
import { SEO } from '../../utils/types/misc';
import { Trend } from '../../utils/types/types2';
import { useSanity } from '@/contexts/SanityProvider';

const TrendsIndex = () => {
  const { client } = useSanity();
  const router = useRouter();
  const { id } = router.query;
  const [trend, setTrend] = useState<Trend | null>(null);

  const getTrend = async (client: any) => {
    try {
      const trend = await client?.fetch(getTrendById(id as string));
      // console.log(trend);

      setTrend(trend[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!client) return;
    if (id) getTrend(client);
  }, [id, client]);

  const seo: SEO = {
    title: trend?.title,
    description: trend?.description,
    image: trend?.image,
  };

  return (
    <MainLayout isGeneral title={seo.title} seo={seo}>
      <div className=" flex flex-col gap-y-3 five:p-3 p-1 w-full">
        <h1 className="text-lg font-semibold text-center">{trend?.title}</h1>
        <Image
          src={trend?.image ?? ''}
          height={1080}
          className=" w-full object-cover max-h-[70vh]"
          width={1920}
          alt="TrendImage"
        />
        {trend?.description.split('<nextp>').map((p, i) => (
          <p key={i} className=" mt-3">
            {p}
          </p>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrendsIndex;
