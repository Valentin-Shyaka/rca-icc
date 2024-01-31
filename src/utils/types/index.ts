export type CompNav = {
  id: number;
  name: string;
  path: string;
};

export interface SeasonData<T = any> {
  [key: string]: T;
}
