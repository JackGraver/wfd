import { useState } from "react";

type RestaurntsMenuProps = {
  setShowVisited: (visited: boolean) => void;
  showVisited: boolean;
};

export default function RestaurantsMenu({
  setShowVisited,
  showVisited,
}: RestaurntsMenuProps) {
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState<
    "rating" | "alphabetical" | "price" | "none" | null
  >(null);

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
              {["rating", "alphabetical", "price", "none"].map((filter) => (
                <p
                  key={filter}
                  onClick={() => setSortBy(filter as typeof sortBy)}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    sortBy === filter ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
