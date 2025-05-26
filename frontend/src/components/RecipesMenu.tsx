import RecipesSearch from "./RecipesSearch";

export default function RecipesMenu() {
    return (
        <div className="flex gap-4 mb-6">
            <div className="flex-1">
                <RecipesSearch />
            </div>
            <div className="w-1/4">
                <span className="block font-medium text-gray-600">
                    Category Filter
                </span>
                {/* Placeholder for future filter UI */}
            </div>
        </div>
    );
}
