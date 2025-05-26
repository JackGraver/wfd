import type { Category } from "./Category";

export type Restaurant = {
    id?: number;
    name: string;
    price: number;
    description: string;
    location: string;
    rating: number;
    visited: boolean;
    categories: Category[];
};
