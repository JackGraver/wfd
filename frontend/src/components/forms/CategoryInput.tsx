import { useEffect, useState } from "react";
import type { Category } from "../../types/Category";

type CategoryInputProps = {
    categories: Category[];
    setFormCategories: (selected: Category[]) => void;
    preSelectedCategories?: Category[];
};

export default function CategoryInput({
    categories: initialCategories,
    setFormCategories,
    preSelectedCategories,
}: CategoryInputProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(
        preSelectedCategories ? preSelectedCategories : []
    );
    const [filterText, setFilterText] = useState("");
    const [categories, setCategories] = useState<Category[]>(initialCategories);

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories]);

    useEffect(() => {
        setFormCategories(selectedCategories);
    }, [selectedCategories]);

    const updateSelected = (category: Category) => {
        setSelectedCategories((prev) =>
            prev.some((c) => c.id === category.id)
                ? prev.filter((c) => c.id !== category.id)
                : [...prev, category]
        );
        setFilterText("");
    };

    const handleAddNewCategory = () => {
        const trimmed = filterText.trim();
        if (trimmed === "") return;

        const alreadyExists = categories.some(
            (c) => c.name.toLowerCase() === trimmed.toLowerCase()
        );
        if (alreadyExists) return;

        const newCategory: Category = {
            id: -1,
            name: trimmed.charAt(0).toUpperCase() + trimmed.slice(1),
        };
        setCategories((prev) => [newCategory, ...prev]);
        updateSelected(newCategory);
    };

    const removeCategory = (id: number) => {
        setSelectedCategories((prev) => prev.filter((c) => c.id !== id));
    };

    const filteredCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <div
                className="w-full border rounded px-3 py-2 flex flex-wrap gap-2 items-center cursor-text min-h-[42px]"
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() => {
                    setShowDropdown(false);
                }}
            >
                {selectedCategories.map((c) => (
                    <span
                        key={c.id}
                        className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeCategory(c.id!);
                        }}
                    >
                        {c.name}
                        <span className="ml-1 text-blue-500">x</span>
                    </span>
                ))}

                <input
                    name="category"
                    placeholder="Search or add category"
                    autoComplete="off"
                    className="flex-1 min-w-[120px] outline-none"
                    onChange={(e) => setFilterText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            if (
                                filterText.trim() !== "" &&
                                !filteredCategories.some(
                                    (c) =>
                                        c.name.toLowerCase() ===
                                        filterText.toLowerCase()
                                )
                            ) {
                                handleAddNewCategory();
                            }
                        }
                    }}
                    value={filterText}
                />
            </div>

            {showDropdown && (
                <div
                    className="absolute left-0 top-full w-full border bg-white z-10 max-h-60 overflow-y-auto"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {filteredCategories.map((c, i) => (
                        <div
                            key={i}
                            className="px-3 py-2 border-b hover:bg-gray-200 flex justify-between cursor-pointer"
                            onClick={() => updateSelected(c)}
                        >
                            <span>{c.name}</span>
                            {selectedCategories.some(
                                (sc) => sc.id === c.id
                            ) && <span className="text-red-500">×</span>}
                        </div>
                    ))}

                    {filterText.trim() !== "" && (
                        <div
                            className="px-3 py-2 text-blue-500 cursor-pointer hover:bg-gray-200"
                            onClick={handleAddNewCategory}
                        >
                            + Add new category “{filterText.trim()}”
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
