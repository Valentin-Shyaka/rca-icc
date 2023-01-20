import { useRouter } from 'next/router';
import React, { useState } from 'react'
import MatchCard from '../../components/MatchCard';
import MainLayout from '../../layouts/MainLayout'
import { capitalize } from '../../utils/funcs';

const Fixtures = () => {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const title =
			capitalize(router.pathname.split("/")[2]) +
			" - " +
			capitalize(router.pathname.split("/")[1]);
  return (
		<MainLayout title={title}>
			<div className=' w-full flex-col'>
				<h1 className='my-2'>Today</h1>
				<div className="grid grid-cols-2 w-full gap-3">
					<MatchCard />
					<MatchCard />
					<MatchCard />
					<MatchCard />
					<MatchCard />
				</div>
			</div>
		</MainLayout>
	);
}

export default Fixtures