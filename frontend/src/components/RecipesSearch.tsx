import { useState } from "react";

export default function RecipesSearch() {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        console.log("Search query:", value);
    };

    return (
        <div className="w-full">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search recipes..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
        </div>
    );
}
