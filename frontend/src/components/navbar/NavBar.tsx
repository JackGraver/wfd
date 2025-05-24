import { useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex items-center justify-between bg-[#CDB4DB] px-6 py-4 shadow">
      <div className="text-4xl font-bold text-white">g, WFD</div>
      <div className="flex gap-4">
        <a
          href="/restaurants"
          className={`${
            isActive("/restaurants") ? "bg-[#FFAFCC]" : "bg-[#FFAFCC]"
          } text-gray-800 font-medium px-4 py-2 rounded-md shadow hover:bg-[#FFC8DD] transition`}
        >
          Restaurants
        </a>
        <a
          href="/recipes"
          className={`${
            isActive("/recipes") ? "bg-[#FFAFCC]" : "bg-[#FFAFCC]"
          } text- font-medium px-4 py-2 rounded-md shadow hover:bg-[#FFC8DD] transition`}
        >
          Recipes
        </a>
      </div>
    </div>
  );
}
