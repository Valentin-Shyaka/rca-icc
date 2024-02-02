import { getDataSetFromYear } from '@/utils/funcs/func1';
import { createClient } from 'next-sanity';

export const sanityConfig: any = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lxeru4rg',
  useCdn: typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
  apiVersion: '2022-11-16',
};

export const sanityClient = createClient(sanityConfig);
export const seasonClient = (season: string) => createClient({ ...sanityConfig, dataset: getDataSetFromYear(season) });
