import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function (req: NextRequest) {
  const { searchParams } = req.nextUrl;
  // const name = searchParams.get('name');
  const image = searchParams.get('image');
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
          <img tw="object-contain " src={image} alt="og:Image" />
        ) : (
          <img
            tw="object-contain"
            src={
              'https://cdn.sanity.io/images/lxeru4rg/2024/57ee018c077683e5bb64b47ff5fa9a0e1d48c4d5-1024x1024.png?fit=max&w=1200&h=1200'
            }
            alt="og:Image"
          />
        )}
      </div>
    ),
    {
      width: 1030,
      height: 1030,
    },
  );
}
