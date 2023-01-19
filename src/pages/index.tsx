import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import SideBar from '../components/constants/SideBar'
import MainLayout from '../layouts/MainLayout'

const Home: NextPage = () => {
  return (
		<MainLayout title='Football'>
			<SideBar />
		</MainLayout>
	);
}

export default Home
