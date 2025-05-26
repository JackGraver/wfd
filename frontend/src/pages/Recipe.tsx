import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Recipe } from "../types/Recipe";

export default function Recipe() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); // Gets the value from ?id=1
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        console.log(recipe);
    }, [recipe]);

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:8000/recipe/${id}`)
            .then((res) => res.json())
            .then((data) => setRecipe(data))
            .catch((err) => console.error("Failed to fetch recipe:", err));
    }, [id]);

    const ingredients = [
        "2 cups flour",
        "1 cup sugar",
        "1/2 cup butter",
        "2 eggs",
        "1 tsp vanilla extract",
    ];

    const steps = [
        "Preheat the oven to 350°F (175°C).",
        "Mix the dry ingredients together in a bowl.",
        "In another bowl, cream the butter and sugar.",
        "Add the eggs and vanilla to the butter mixture.",
        "Gradually add the dry ingredients to the wet mixture.",
        "Pour the batter into a greased baking dish.",
        "Bake for 30 minutes or until golden brown.",
        "Let it cool before serving.",
    ];

    if (!recipe) {
        return <div className="p-6">Loading recipe...</div>;
    }

    return (
        <div className="flex flex-col h-screen p-6 gap-6 bg-gray-50">
            <div className="flex flex-row  p-6 gap-8 items-start border-b border-black">
                <div className="flex flex-col justify-between">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                        {recipe.name}
                    </h1>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">
                        {recipe.calories}C {recipe.protein}P {recipe.fiber}F
                    </span>
                </div>
                <div className="flex-1 border-l-4 border-[#FF5D8F]">
                    <div className="shadow-md rounded-md pl-6 pb-2">
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">
                            Ingredients
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {ingredients.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex-grow  p-6 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Steps
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-gray-600">
                    {steps.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
