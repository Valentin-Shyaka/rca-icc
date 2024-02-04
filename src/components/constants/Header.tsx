import { useSanity } from '@/contexts/SanityProvider';
import { getYearFromDataSet } from '@/utils/funcs/func1';
import { Alert, Select } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaArrowLeft, FaHandPointLeft, FaHome } from 'react-icons/fa';
import { MdScoreboard } from 'react-icons/md';
import Banner from '../other/Banner';

const Header = () => {
  const { setDataSet, refresh, dataSet } = useSanity();
  const [season, setSeason] = React.useState('2023');
  const [showAlert, setShowAlert] = React.useState(true);
  const [active, setActive] = React.useState('');
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const path = pathname.split('/')[1];
    setActive(path);
  }, [router]);

  const isGaming = pathname.startsWith('/gaming');

  useEffect(() => {
    if (!dataSet) return;
    console.log('dataSet has changed', dataSet);
    const season = getYearFromDataSet(dataSet);
    setSeason(season);
  }, [dataSet]);

  return (
    <div className="w-full flex text-lg text-bold font-bold mb-2 justify-between h-[60px] items-center">
      <div className=" border border-blue min-w-fit rounded-md overflow-hidden text-center gap-x-1 flex items-center">
        <Link href={'/'} className="text-white font-sans bg-blue px-3 py-1">
          ICC
        </Link>
        {/* <p className='ml-1'>2023</p> */}
        <Select
          variant="unstyled"
          value={season}
          data={[
            { value: '2023', label: '2023' },
            { value: '2024', label: '2024' },
          ]}
          allowDeselect={false}
          ml={2}
          w={70}
          classNames={{
            section: ' p-0 season-select-section',
            input: 'p-0 season-input',
            dropdown: 'season-dropdown',
          }}
          onChange={(value) => {
            if (!value) return;
            setSeason(value);
            refresh(value);
          }}
        />
      </div>
      {showAlert && (
        <Banner
          // message="👈🏾 You can always select competition year to view older results. Click on logo year and see"
          message={
            <Alert icon={<FaHandPointLeft />} onClose={() => setShowAlert(false)} withCloseButton>
              <h1 className="text-blue text-sm italic">
                You can always select competition year to view older results. Click on logo year and see
              </h1>
            </Alert>
          }
        />
      )}
      {/* <span className=" text-grey font-normal whitespace-nowrap text-base">
        <Moment format="DD MMMM YYYY">{Date.now()}</Moment>
      </span> */}
      <div className="flex font-semibold gap-2 text-base">
        <Link
          className={` px-2 py-1 duration-150 text-blue flex gap-2 items-center hover:text-blue/70
          `}
          href={isGaming ? '/' : '/gaming'}
        >
          {isGaming ? <FaHome /> : <MdScoreboard />}
          {isGaming ? 'Home' : 'Fantasy'}
        </Link>
      </div>
    </div>
  );
};

export default Header;
