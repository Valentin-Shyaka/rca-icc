import { useRouter } from 'next/router';
import React, { useState } from 'react'
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
			<div>Fixtures</div>
		</MainLayout>
	);
}

export default Fixtures