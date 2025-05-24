import { useEffect, useState } from "react";
import RestaurantModal from "../components/modals/RestaurantModal";
import type { Restaurant } from "../types/Restaurant";
import { addRestaurant } from "../utils/AddRestaurant";
import InputPopup from "../components/forms/InputPopup";
import RestaurantsMenu from "../components/RestaurantsMenu";
import RestaurantInput from "../components/forms/RestaurantInput";
import RatingInput from "../components/forms/RatingInput";

export default function Restaurants() {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showRatingInput, setShowRatingInput] = useState<number>(-1);

  const [showVisited, setShowVisited] = useState(false);

  const [wantToEat, setWantToEat] = useState<Restaurant[]>([]);
  const [haveEaten, setHaveEaten] = useState<Restaurant[]>([]);

  const data = showVisited ? haveEaten : wantToEat;

  useEffect(() => {
    fetch("http://192.168.4.64:8000/restaurants")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWantToEat(data.filter((r: Restaurant) => !r.visited));
        setHaveEaten(data.filter((r: Restaurant) => r.visited));
      });
  }, []);

  const newRestaurant = async (restaurant: Restaurant) => {
    addRestaurant(restaurant)
      .then((data) => {
        setWantToEat([data, ...wantToEat]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const setToVisited = async (id: number, rating: number) => {
    if (!id) return;

    try {
      setShowRatingInput(-1);

      console.log("set rating", rating);

      const response = await fetch(`http://192.168.4.64:8000/visited/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }), // Send rating here
      });

      if (!response.ok) {
        throw new Error("Failed to mark as visited");
      }

      const updatedRestaurant: Restaurant = await response.json();

      // Remove from wantToEat and add to haveEaten
      setWantToEat((prev) => prev.filter((r) => r.id !== updatedRestaurant.id));
      setHaveEaten((prev) => [...prev, updatedRestaurant]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6">
      {showPopup && (
        <RestaurantInput
          onSubmit={newRestaurant}
          onClose={() => setShowPopup(false)}
        />
      )}
      {showRatingInput && showRatingInput != -1 && (
        <RatingInput
          onSubmit={(rating) => {
            setToVisited(showRatingInput, rating);
          }}
          onClose={() => {
            () => setShowRatingInput(-1);
          }}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Restaurants</h1>
        <button
          className="bg-[#FFAFCC] text-black px-4 py-2 rounded-lg hover:bg-[#FFC8DD]"
          onClick={() => {
            setShowPopup(true);
          }}
        >
          + Add Restaurant
        </button>
      </div>

      <RestaurantsMenu
        setShowVisited={setShowVisited}
        showVisited={showVisited}
      />

      {}
      <div className="flex flex-row flex-wrap">
        {data &&
          data.map((r) => (
            <RestaurantModal
              key={r.id}
              restaurant={r}
              setShowRatingInput={() => {
                setShowRatingInput(r.id!);
              }}
            />
          ))}
      </div>
    </div>
  );
}
