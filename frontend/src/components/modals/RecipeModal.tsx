import { useNavigate } from "react-router-dom";
import type { Recipe } from "../../types/Recipe";
import ModalLayout from "./ModalLayout";
import { useState } from "react";
import RecipeInput from "../forms/RecipeInput";
import DeleteInput from "../forms/DeleteInput";
import { deleteRecipe, updateRecipe } from "../../utils/RecipeAPI";

type RecipeModalProps = {
    recipe: Recipe;
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

export default function RecipeModal({ recipe, setRecipes }: RecipeModalProps) {
    const navigate = useNavigate();

    const [showEditInput, setShowEditInput] = useState(false);
    const [showDeleteInput, setShowDeleteInput] = useState(false);

    const updRecipe = async (restaurant: Recipe) => {
        updateRecipe(restaurant)
            .then((data) => {
                console.log("upd ret", data);
                // setRecipes(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const delRecipe = async (id: number | undefined) => {
        if (!id) return;

        deleteRecipe(id)
            .then((_) => {
                setRecipes((prev) => prev.filter((r) => r.id !== id));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div onClick={() => navigate(`/recipe?id=${recipe.id}`)}>
            <ModalLayout
                onEdit={setShowEditInput}
                onDelete={setShowDeleteInput}
            >
                {showEditInput && (
                    <RecipeInput
                        onSubmit={updRecipe}
                        onClose={() => {
                            setShowEditInput(false);
                        }}
                        editRecipe={recipe}
                    />
                )}
                {showDeleteInput && (
                    <DeleteInput
                        onConfirm={() => {
                            delRecipe(recipe.id);
                        }}
                        onCancel={() => setShowDeleteInput(false)}
                    />
                )}
                <div className="flex flex-col gap-1">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-1">
                            {recipe.name}
                        </h1>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-500 min-h-[2.5rem] items-center">
                            {recipe.categories &&
                            recipe.categories.length > 0 ? (
                                <>
                                    {recipe.categories.slice(0, 3).map((c) => (
                                        <span
                                            key={c.id}
                                            className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-medium"
                                        >
                                            {c.name}
                                        </span>
                                    ))}
                                    {recipe.categories.length > 3 && (
                                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                                            +{recipe.categories.length - 3}
                                        </span>
                                    )}
                                </>
                            ) : (
                                <div className="invisible px-2 py-1 rounded-full text-xs font-medium">
                                    placeholder
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-700 font-medium">
                        <div className="flex items-center gap-1">
                            <Clock />
                            <span>{recipe.prep_time} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Flame />
                            <span>{recipe.calories} kcal</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
                            onClick={() => navigate(`/recipe?id=${recipe.id}`)}
                        >
                            View Full Recipe
                        </button>
                    </div>
                </div>
            </ModalLayout>
        </div>
    );
}

function Clock() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="rgb(255, 175, 204)"
            className="size-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
    );
}

function Flame() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="yellow"
            className="size-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
        </svg>
    );
}
