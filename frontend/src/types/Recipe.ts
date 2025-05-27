import type { Category } from "./Category";

export type Recipe = {
    id?: number;
    name: string;
    categories: Category[];
    prep_time: number;
    calories: number;
    protein: number;
    fiber: number;
    steps?: Step[];
    ingredients?: Ingredient[];
};

export type Ingredient = {
    name: string;
};

export type Step = {
    step_number: number;
    instruction: string;
};
// type Macros = {
//     calories: number;
//     protein: number;
//     fiber: number;
// };
