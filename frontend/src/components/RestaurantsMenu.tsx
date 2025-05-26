import { useState } from "react";

type RestaurntsMenuProps = {
    setShowVisited: (visited: boolean) => void;
    showVisited: boolean;
    filter: FilterType;
    setFilter: (filter: FilterType) => void;
};

export type FilterType = "rating" | "alphabetical" | "price" | "none";

export default function RestaurantsMenu({
    setShowVisited,
    showVisited,
    filter,
    setFilter,
}: RestaurntsMenuProps) {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className="flex gap-4 mb-6 border-b border-black">
            <button
                onClick={() => setShowVisited(false)}
                className={`px-4 py-2 ${!showVisited ? "border-b-2" : ""}`}
            >
                Want to Eat at
            </button>
            <button
                onClick={() => setShowVisited(true)}
                className={`px-4 py-2 ${showVisited ? "border-b-2" : ""}`}
            >
                Have Eaten at
            </button>
            {showVisited && (
                <div className="relative ml-auto">
                    <button
                        className="px-4 py-2"
                        onClick={() => setShowFilter((prev) => !prev)}
                    >
                        Filter
                    </button>

                    {showFilter && (
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-40 z-10">
                            {(
                                [
                                    "rating",
                                    "alphabetical",
                                    "price",
                                    "none",
                                ] as FilterType[]
                            ).map((f) => (
                                <p
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                                        f === filter
                                            ? "bg-gray-200 font-semibold"
                                            : ""
                                    }`}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
