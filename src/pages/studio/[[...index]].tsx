import { makeConfig, useSanity } from '@/contexts/SanityProvider';
import { getDataSetFromYear, getYearFromDataSet } from '@/utils/funcs/func1';
import { Select, Tooltip } from '@mantine/core';
import { NextStudio } from 'next-sanity/studio';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import Draggable from 'react-draggable';

export default function AdminPage() {
  const { config, setDataSet, dataSet, setConfig } = useSanity();
  const searchParams = useSearchParams();
  const [season, setSeason] = React.useState('2023');

  useEffect(() => {
    const dts = getDataSetFromYear(season);
    console.log('dts', dts);
    if (dts === dataSet) return;
    setDataSet(dts);
    setConfig?.(makeConfig(dts));
    // router.push(router.pathname, `?season=${season}`, { shallow: true });
    // // // window.location.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season]);

  useEffect(() => {
    if (!dataSet) return;
    const season = searchParams.get('season') ?? getYearFromDataSet(dataSet);
    setSeason(season);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const hml = document.querySelector('html');
    if (!hml) return;
    // increase font size
    hml.style.fontSize = '18px';
  }, []);

  return (
    <>
      <NextStudio config={config} />
      <Draggable>
        <div className=" fixed bottom-11 left-2 z-50">
          <Tooltip label="Drag where You want" withArrow>
            <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 cursor-grab w-[110%] p-2 bg-blue"></div>
          </Tooltip>
          <Select
            value={season}
            data={[
              { value: '2023', label: '2023' },
              { value: '2024', label: '2024' },
            ]}
            allowDeselect={false}
            // classNames={{
            //   section: " p-0 season-select-section",
            //   input: "p-0 season-input",
            //   dropdown: "season-dropdown",
            // }}
            onChange={(value) => {
              if (!value) return;
              setSeason(value);
            }}
          />
        </div>
      </Draggable>
    </>
  );
}
