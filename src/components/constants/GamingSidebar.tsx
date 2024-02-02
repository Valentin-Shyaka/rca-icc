import Link from 'next/link';
import { useApp } from '../../contexts/AppProvider';
import { MdScoreboard } from 'react-icons/md';
import { gameSidebarRoutes } from '@/utils/data/sidebar';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';
import { deleteCookie, getCookie } from 'cookies-next';
import { decodeToken } from '@/utils/funcs/fetch';
import { get } from 'http';

const GamingSidebar = () => {
  const { trends, matches } = useApp();
  const { pathname } = useRouter();

  const finishedMatches = matches
    ?.filter((match) => match?.status?.status === 'FT' || match?.status?.status === 'FF')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const logout = () => {
    deleteCookie('token');
    window.location.reload();
  };

  console.log('decoded token', decodeToken(getCookie('token')!));

  return (
    <div className=" tab:flex hidden flex-col h-[90vh] max-w-[300px] w-1/4 gap-y-4 overflow-y-auto min-w-[200px]">
      <div className="flex flex-col gap-y-2 h-full">
        <div className="flex h-full flex-col  rounded-b-md px-2 border-divBack justify-between border-t-0 border-2">
          <div className="flex flex-col gap-2">
            <span className="px-2 font-semibold py-3">Fantasy</span>
            {gameSidebarRoutes.map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.name}
                  href={route.path}
                  className={` w-full flex items-center gap-2 p-2 hover:bg-blue hover:text-white cursor-pointer rounded-md text-sm font-semibold
              ${isActive ? ' bg-blue text-white ' : ''}
              `}
                >
                  <span className="w-7">{route.icon}</span>
                  {route.name}
                </Link>
              );
            })}
          </div>
          <button
            className={` w-full text-blue flex items-center gap-2 p-2 hover:bg-blue hover:text-white cursor-pointer rounded-md text-sm font-semibold
              `}
            onClick={logout}
          >
            <span className="w-7">
              <BiLogOut />
            </span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamingSidebar;
