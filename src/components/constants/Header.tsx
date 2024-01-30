import { useSanity } from "@/contexts/SanityProvider";
import { getYearFromDataSet } from "@/utils/funcs/func1";
import { Select } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Moment from "react-moment";

const Header = () => {
  const { setDataSet, refresh, dataSet } = useSanity();
  const [season, setSeason] = React.useState("2023");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!dataSet) return;
    console.log("dataSet has changed", dataSet);
    const season = getYearFromDataSet(dataSet);
    setSeason(season);
  }, [dataSet]);

  return (
    <div className="w-full flex text-lg text-bold font-bold mb-2 justify-between h-[60px] items-center">
      <div className=" border border-blue rounded-md overflow-hidden text-center gap-x-1 flex items-center">
        <p className="text-white font-sans bg-blue px-3 py-1">ICC</p>
        {/* <p className='ml-1'>2023</p> */}
        <Select
          variant="unstyled"
          value={season}
          data={[
            { value: "2023", label: "2023" },
            { value: "2024", label: "2024" },
          ]}
          allowDeselect={false}
          ml={2}
          w={70}
          classNames={{
            section: " p-0 season-select-section",
            input: "p-0 season-input",
            dropdown: "season-dropdown",
          }}
          onChange={(value) => {
            if (!value) return;
            setSeason(value);
            refresh(value);
          }}
        />
      </div>

      <span className=" text-grey font-normal truncate text-base">
        <Moment format="DD MMMM YYYY">{Date.now()}</Moment>
      </span>
    </div>
  );
};

export default Header;
