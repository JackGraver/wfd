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

export async function updateRecipe(recipe: Recipe) {
    const response = await fetch(`http://192.168.4.64:8000/recipes`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to update Recipe: ${error}`);
    }

    return await response.json();
}

export async function deleteRecipe(recipe: number) {
    const response = await fetch(`http://192.168.4.64:8000/recipes/${recipe}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to delete Recipe: ${error}`);
    }

    if (response.status === 204) return; // No content
    return await response.json();
}
