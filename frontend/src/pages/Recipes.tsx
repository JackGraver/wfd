import { useEffect, useState } from "react";
import type { Recipe } from "../types/Recipe";
import RecipeSearch from "../components/RecipesSearch";
import RecipeInput from "../components/forms/RecipeInput";
import RecipeMenu from "../components/RecipesMenu";
import RecipeModal from "../components/modals/RecipeModal";
import type { Category } from "../types/Category";
import { addRecipe } from "../utils/AddRecipe";

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetch("http://192.168.4.64:8000/recipes")
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data);
            });
        fetch("http://192.168.4.64:8000/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            });
    }, []);

    const newRecipe = (recipe: Recipe) => {
        console.log("add recipe", recipe);
        addRecipe(recipe)
            .then((data) => {
                setRecipes([data, ...recipes]);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="p-6">
            {showPopup && (
                <RecipeInput
                    categories={categories}
                    onSubmit={newRecipe}
                    onClose={() => setShowPopup(false)}
                />
            )}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Recipes</h1>
                <button
                    className="bg-[#FFAFCC] text-black px-4 py-2 rounded-lg hover:bg-[#FFC8DD]"
                    onClick={() => {
                        setShowPopup(true);
                    }}
                >
                    + Add Recipe
                </button>
            </div>

            <RecipeMenu />

            <div className="flex flex-row flex-wrap">
                {recipes.map((r) => (
                    <RecipeModal key={r.id} recipe={r} />
                ))}
            </div>
        </div>
    );
}
