import { schemaTypes } from "@/cms/schemas";
import LoadingView from "@/components/other/LoadingView";
import { getDataSetFromYear, getYearFromDataSet } from "@/utils/funcs/func1";
import { visionTool } from "@sanity/vision";
import { SanityClient, createClient } from "next-sanity";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { defineConfig, set } from "sanity";
import { structureTool } from "sanity/structure";

interface SanityContextProps {
  config: any;
  dataSet: string | null;
  setDataSet: React.Dispatch<React.SetStateAction<string | null>>;
  client: SanityClient | null;
  setClient: React.Dispatch<React.SetStateAction<SanityClient | null>>;
  refresh: (year: string) => void;
}

const SanityContext = React.createContext<SanityContextProps>({
  config: null,
  dataSet: null,
  setDataSet: () => {},
  client: null,
  setClient: () => {},
  refresh: () => {},
});

export const useSanity = () => useContext(SanityContext);

interface Props {
  children: React.ReactNode;
}

const makeConfig = (dataSet?: string) => {
  return defineConfig({
    basePath: "/studio",
    name: "rca-icc",
    title: "RCA interclass competitions CMS",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    useCdn:
      typeof document !== "undefined" && process.env.NODE_ENV === "production",
    apiVersion: "2022-11-16",
    dataset: dataSet ?? "production",
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes as any,
    },
  });
};

const currYear = new Date().getFullYear();

const SanityProvider = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const [config, setConfig] = React.useState<any>(null);
  const [dataSet, setDataSet] = React.useState<string | null>(null);
  const [client, setClient] = React.useState<SanityClient | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!dataSet) return;
    console.log("data set changed", dataSet);
    setConfig(makeConfig(dataSet));
    const client = createClient(makeConfig(dataSet));
    setClient(client);
  }, [dataSet]);

  const refresh = (year: string) => {
    const dts = getDataSetFromYear(year);
    console.log(dts, dataSet);
    if (dts === dataSet) return;
    console.log("refreshing");
    router.push(router.pathname, `?season=${year}`, { shallow: true });
  };

  useEffect(() => {
    // if (dataSet) return;
    console.log("params to change data set", searchParams.get("season"));
    setLoading(true);
    setTimeout(() => {
      const q_season = searchParams.get("season");
      const season = q_season ?? String(currYear);
      setDataSet(getDataSetFromYear(season));
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  if (!client || !config || loading || !dataSet) return <LoadingView />;

  return (
    <SanityContext.Provider
      value={{ config, dataSet, setDataSet, client, setClient, refresh }}
    >
      {children}
    </SanityContext.Provider>
  );
};

export default SanityProvider;
