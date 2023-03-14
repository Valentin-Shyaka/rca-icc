import { ImageResponse } from '@vercel/og';
import Image from 'next/image';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function (req: NextRequest) {
    const { searchParams } = req.nextUrl
    const name = searchParams.get('name')
    const image = searchParams.get('image')
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        {image ? (
      <img
        tw='object-cover min-w-full'
       src={image} alt='og:Image' />
       ):(
        <img
        tw='object-cover min-w-full'
        src={'https://cdn.sanity.io/images/lxeru4rg/production/7db3e46e0e970a3bc31d281fea74473bf3d56edc-846x755.png'} alt='og:Image' />
       )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
