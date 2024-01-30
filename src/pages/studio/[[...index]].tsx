import { useSanity } from "@/contexts/SanityProvider";
import { getDataSetFromYear } from "@/utils/funcs/func1";
import { Select } from "@mantine/core";
import { NextStudio } from "next-sanity/studio";
import React, { useEffect } from "react";

export default function AdminPage() {
  const { config, setDataSet, dataSet } = useSanity();
  const [season, setSeason] = React.useState("2023");

  useEffect(() => {
    const dts = getDataSetFromYear(season);
    if (dts === dataSet) return;
    setDataSet?.(dts);
    // window.location.reload();
  }, [season]);

  return (
    <>
      <NextStudio config={config} />
      <div className=" fixed bottom-2 left-2 z-50">
        {/* <select
          className="bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => setDataSet?.(e.target.value)}
        >
          <option value="production">Production</option>
          <option value="staging">Staging</option>
        </select> */}
        <Select
          value={season}
          data={[
            { value: "2023", label: "2023" },
            { value: "2024", label: "2024" },
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
    </>
  );
}
