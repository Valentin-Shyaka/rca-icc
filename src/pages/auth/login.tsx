import { createUserFromToken, decodeToken } from '@/utils/funcs/fetch';
import { Button } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { setCookie } from 'cookies-next';

const LoginPage = () => {
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const getOauthToken = async () => {
      const token = searchParams.get('token');
      if (!token) return;
      const decoded = decodeToken(token);
      console.log('decoded token', decoded);
      if (token) {
        setLoading(true);
        setCookie('token', token, { maxAge: 60 * 60 * 24 });
        await createUserFromToken(token);
        window.location.href = '/gaming';
      }
    };
    getOauthToken();
  }, []);

  const loginWithRCA = () => {
    window.location.href = `http://rcaproj.com:9099/auth/login?redirect=${window.location.href}&oauth=true`;
  };

  return (
    <div className="flex h-screen w-full flex-col gap-2 justify-center items-center">
      <button
        disabled={loading}
        onClick={loginWithRCA}
        className="w-fit flex items-center gap-3 text-lg h-14 font-medium border-2 px-4 border-[#19234a] hover:bg-slate-200 rounded-md"
      >
        {loading ? (
          <LuLoader2 className=" animate-spin" size={40} />
        ) : (
          <Image src="/images/rca.png" alt="google" width={45} height={45} />
        )}
        Login With RCA MIS
      </button>
      <span>Or</span>
      <Link href="/" className=" border-blue border rounded-3xl px-4 py-2 hover:bg-blue hover:text-white duration-200">
        Go Back Home
      </Link>
    </div>
  );
};

export default LoginPage;
