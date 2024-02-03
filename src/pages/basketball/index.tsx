import Link from 'next/link';
import { useApp } from '../../contexts/AppProvider';
import dynamic from 'next/dynamic';
const MatchCard = dynamic(() => import('@/components/MatchCard'));
const BasketTable = dynamic(() => import('@/components/constants/BasketTable'));
const MainLayout = dynamic(() => import('@/layouts/MainLayout'));

const IndexBasket = () => {
  const { teams, matches } = useApp();
  const unfinishedMatches = matches?.filter(
    (match) => match.status?.status !== 'FT' && match.category === 'basketball',
  );
  const upComingMatches = unfinishedMatches?.slice(0, 5);
  return (
    <MainLayout title="Basketball">
      <div className="flex flex-col w-full gap-y-3">
        {/* <div className='flex w-full flex-col mx-auto max-w-[800px]'>
				<LiveGameCard path='/match/23' />
			</div> */}
        <div className="flex flex-col border-2 rounded-md p-2 border-gray">
          <div className="p-3 gap-y-3">
            <div className="float-left font-bold text-lg px-3">
              <h3>Basketball Standings</h3>
            </div>
            <BasketTable teams={teams?.basketball!} />
          </div>
        </div>
        <div className="flex flex-col border-2 rounded-md p-2 border-gray">
          <h1 className="text-xl font-semibold">Upcoming Matches</h1>
          <div className="grid w-full mt-4 desktop:grid-cols-3 five:grid-cols-2 gap-2">
            {upComingMatches?.map((match) => <MatchCard key={match._id} {...match} />)}
          </div>
          {upComingMatches?.length === 0 && <h1 className="">No Matches Available</h1>}
          <Link
            href={'/basketball/fixtures'}
            className="w-fit mt-4 px-3 py-2 text-blue flex items-center hover:text-[#1a44da] duration-300 rounded-md"
          >
            See All Fixtures<span className="ml-2 mt-1">{'>>'}</span>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default IndexBasket;
