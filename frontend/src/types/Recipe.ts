export type Recipe = {
  id: number;
  name: string;
  categories: string[];
  prep_time: number;
  macros: Macros;
};

type Macros = {
  calories: number;
  protein: number;
  fiber: number;
};
