import { useState } from "react";
import type { Recipe } from "../types/Recipe";
import RecipeSearch from "../components/RecipeSearch";
import RecipeInput from "../components/forms/RecipeInput";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="p-6">
      {showPopup && (
        <RecipeInput
        // onSubmit={newRestaurant}
        // onClose={() => setShowPopup(false)}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            setShowPopup(true);
          }}
        >
          + Add Recipe
        </button>
      </div>

      <RecipeSearch />

      <div>Search Bar + Category Dropdown</div>
      <div>
        {recipes.map((r) => (
          <div>recipe</div>
        ))}
      </div>
    </div>
  );
}
