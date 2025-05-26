import type { Recipe } from "../types/Recipe";

export async function addRecipe(recipe: Recipe) {
    const response = await fetch("http://192.168.4.64:8000/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to add recipe: ${error}`);
    }

    return await response.json();
}
