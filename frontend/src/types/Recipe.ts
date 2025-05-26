import type { Category } from "./Category";

export type Recipe = {
    id?: number;
    name: string;
    categories: Category[];
    prep_time: number;
    calories: number;
    protein: number;
    fiber: number;
    steps: string[];
    ingredients: string[];
};

// type Macros = {
//     calories: number;
//     protein: number;
//     fiber: number;
// };
