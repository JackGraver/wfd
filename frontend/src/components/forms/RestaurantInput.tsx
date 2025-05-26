import { useEffect, useState } from "react";
import type { Restaurant } from "../../types/Restaurant";
import InputPopup from "./InputPopup";
import type { Category } from "../../types/Category";
import CategoryInput from "./CategoryInput";

type InputPopupProps = {
    categories: Category[];
    onSubmit: (restaurant: Restaurant) => void;
    onClose: () => void;
};

export default function RestaurantInput({
    categories,
    onSubmit,
    onClose,
}: InputPopupProps) {
    const [formData, setFormData] = useState<Restaurant>({
        name: "",
        categories: [],
        price: 0,
        description: "",
        location: "",
        rating: -1,
        visited: false,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const setCategories = (selected: Category[]) => {
        setFormData((prev) => ({ ...prev, categories: selected }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <InputPopup>
            <h2 className="text-xl font-semibold mb-4">Add New Restaurant</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                    name="name"
                    placeholder="Name"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                    required
                />
                <CategoryInput
                    categories={categories}
                    setFormCategories={setCategories}
                />
                <input
                    type="number"
                    name="price"
                    autoComplete="off"
                    min={0}
                    placeholder="Enter price level"
                    onChange={handleChange}
                    value={formData.price ?? ""}
                    className="border rounded px-3 py-2"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    autoComplete="off"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                    rows={3}
                />
                <input
                    name="location"
                    placeholder="Location"
                    autoComplete="off"
                    value={formData.location}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                    required
                />

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
        </InputPopup>
    );
}
