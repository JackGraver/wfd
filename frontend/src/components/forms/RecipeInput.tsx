import { useState } from "react";
import InputPopup from "./InputPopup";
import type { Recipe } from "../../types/Recipe";
import CategoryInput from "./CategoryInput";
import type { Category } from "../../types/Category";

type InputPopupProps = {
    categories: Category[];
    onSubmit: (restaurant: Recipe) => void;
    onClose: () => void;
};

export default function RecipeInput({
    categories,
    onSubmit,
    onClose,
}: InputPopupProps) {
    const [ingredients, setIngredients] = useState([""]);
    const [steps, setSteps] = useState([""]);

    const [formData, setFormData] = useState<Recipe>({
        name: "",
        categories: [],
        prep_time: 0,
        calories: 0,
        protein: 0,
        fiber: 0,
        steps: [],
        ingredients: [],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDynamicChange = (
        list: string[],
        setList: (val: string[]) => void,
        index: number,
        value: string
    ) => {
        const updated = [...list];
        updated[index] = value;
        if (index === list.length - 1 && value.trim() !== "") {
            updated.push("");
        }
        setList(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        formData.ingredients = ingredients;
        formData.steps = steps;
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <InputPopup>
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Add New Recipe</h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-3"
                >
                    <div className="flex flex-row gap-1">
                        <input
                            name="name"
                            placeholder="Recipe Name"
                            className="w-full border rounded px-3 py-2"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="prep_time"
                            placeholder="Preparation Time"
                            className="w-full border rounded px-3 py-2"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                        <input
                            type="number"
                            name="calories"
                            placeholder="Calories"
                            className="border rounded px-3 py-2"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="protein"
                            placeholder="Protein"
                            className="border rounded px-3 py-2"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="fiber"
                            placeholder="Fiber"
                            className="border rounded px-3 py-2"
                            autoComplete="off"
                            onChange={handleChange}
                        />
                    </div>
                    <CategoryInput
                        categories={categories}
                        setFormCategories={() => {}}
                    />

                    <div className="grid grid-cols-2 gap-1">
                        <div>
                            <h3 className="text-md font-semibold mb-1">
                                Ingredients
                            </h3>
                            {ingredients.map((value, i) => (
                                <input
                                    key={i}
                                    value={value}
                                    onChange={(e) =>
                                        handleDynamicChange(
                                            ingredients,
                                            setIngredients,
                                            i,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Ingredient ${i + 1}`}
                                    className="w-full border rounded px-3 py-2 mb-2"
                                />
                            ))}
                        </div>

                        <div>
                            <h3 className="text-md font-semibold mb-1">
                                Steps
                            </h3>
                            {steps.map((value, i) => (
                                <input
                                    key={i}
                                    value={value}
                                    onChange={(e) =>
                                        handleDynamicChange(
                                            steps,
                                            setSteps,
                                            i,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Step ${i + 1}`}
                                    className="w-full border rounded px-3 py-2 mb-2"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </InputPopup>
    );
}
