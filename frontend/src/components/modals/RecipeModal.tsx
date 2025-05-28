import { useNavigate } from "react-router-dom";
import type { Recipe } from "../../types/Recipe";
import ModalLayout from "./ModalLayout";
import { Clock, Flame } from "lucide-react"; // optional icons

type RecipeModalProps = {
    recipe: Recipe;
};

export default function RecipeModal({ recipe }: RecipeModalProps) {
    const navigate = useNavigate();

    return (
        <ModalLayout
            onEdit={function (set: boolean): void {
                throw new Error("Function not implemented.");
            }}
            onDelete={function (): void {
                throw new Error("Function not implemented.");
            }}
        >
            <div className="flex flex-col gap-1">
                {/* Title */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-1">
                        {recipe.name}
                    </h1>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500 min-h-[2.5rem] items-center">
                        {recipe.categories && recipe.categories.length > 0 ? (
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

                {/* Info section */}
                <div className="flex items-center gap-6 text-sm text-gray-700 font-medium">
                    <div className="flex items-center gap-1">
                        <Clock size={16} className="text-pink-500" />
                        <span>{recipe.prep_time} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Flame size={16} className="text-yellow-500" />
                        <span>{recipe.calories} kcal</span>
                    </div>
                </div>

                {/* View button */}
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
    );
}
