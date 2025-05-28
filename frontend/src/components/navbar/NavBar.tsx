import { useLocation } from "react-router-dom";
import LightDarkToggle from "./LightDarkToggle";

export default function NavBar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#CDB4DB] px-6 py-4 shadow">
            <div className="flex flex-row items-center gap-4">
                <div className="text-4xl font-bold text-white">
                    <a href="/">g, WFD</a>
                </div>
                <LightDarkToggle />
            </div>

            <div className="flex gap-4">
                <a
                    href="/restaurants"
                    className={`${
                        isActive("/restaurants")
                            ? "bg-[#ff99be]"
                            : "bg-[#FFAFCC]"
                    } text-gray-800 font-medium px-4 py-2 rounded-md shadow hover:bg-[#FFC8DD] transition`}
                >
                    Restaurants
                </a>
                <a
                    href="/recipes"
                    className={`${
                        isActive("/recipes") ? "bg-[#ff99be]" : "bg-[#FFAFCC]"
                    } text- font-medium px-4 py-2 rounded-md shadow hover:bg-[#FFC8DD] transition`}
                >
                    Recipes
                </a>
            </div>
        </div>
    );
}
