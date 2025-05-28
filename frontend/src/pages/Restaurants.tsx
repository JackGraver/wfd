import { useEffect, useState } from "react";
import RestaurantModal from "../components/modals/RestaurantModal";
import type { Restaurant } from "../types/Restaurant";
import { addRestaurant } from "../utils/RestaurantAPI";
import RestaurantsMenu from "../components/RestaurantsMenu";
import RestaurantInput from "../components/forms/RestaurantInput";
import RatingInput from "../components/forms/RatingInput";
import Notification from "../components/Notification";
import type { Category } from "../types/Category";
import type { NotificationInfo } from "../types/NotificationInfo";

export type FilterType = "rating" | "alphabetical" | "price" | "none";

export const filterFunctions: Record<
    FilterType,
    (a: Restaurant, b: Restaurant) => number
> = {
    rating: (a, b) => b.rating - a.rating,
    alphabetical: (a, b) => a.name.localeCompare(b.name),
    price: (a, b) => a.price - b.price,
    none: () => 0, // neutral/no sorting
};

export default function Restaurants() {
    const [showRestaurantInput, setShowRestaurantInput] = useState(false);
    const [showRatingInput, setShowRatingInput] = useState<number>(-1);
    const [showNotification, setShowNotification] =
        useState<NotificationInfo>();

    const [showVisited, setShowVisited] = useState(false);

    const [wantToEat, setWantToEat] = useState<Restaurant[]>([]);
    const [haveEaten, setHaveEaten] = useState<Restaurant[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [filter, setFilter] = useState<FilterType>("none");

    const data = showVisited ? haveEaten : wantToEat;

    useEffect(() => {
        fetch("http://192.168.4.64:8000/restaurants")
            .then((res) => res.json())
            .then((data) => {
                setWantToEat(data.filter((r: Restaurant) => !r.visited));
                setHaveEaten(data.filter((r: Restaurant) => r.visited));
            });
        fetch("http://192.168.4.64:8000/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            });
    }, []);

    const newRestaurant = async (restaurant: Restaurant) => {
        console.log("ins res", restaurant);
        addRestaurant(restaurant)
            .then((data) => {
                setWantToEat([data, ...wantToEat]);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const updatedRestaurant = async (updated: Restaurant) => {
        try {
            if (updated.visited) {
                // Replace in haveEaten list
                setHaveEaten((prev) =>
                    prev.map((r) => (r.id === updated.id ? updated : r))
                );
            } else {
                // Replace in wantToEat list
                setWantToEat((prev) =>
                    prev.map((r) => (r.id === updated.id ? updated : r))
                );
            }
        } catch (error) {
            console.error("Error updating restaurant:", error);
        }
    };

    const deleteRestaurant = async (id: number) => {
        setHaveEaten((prev) => prev.filter((r) => r.id !== id));
        setWantToEat((prev) => prev.filter((r) => r.id !== id));
        setShowNotification({
            message: "Successfully deleted Restaurant.",
            error: false,
        });
    };

    const setToVisited = async (id: number, rating: number) => {
        if (!id) return;

        try {
            setShowRatingInput(-1);

            console.log("set rating", rating);

            const response = await fetch(
                `http://192.168.4.64:8000/visited/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ rating }),
                }
            );

            if (!response.ok) {
                const r = wantToEat.find((r) => (r.id = id));
                setShowNotification({
                    message: `Error Setting ${r?.name} to Visited.`,
                    error: false,
                });
            }

            const updatedRestaurant: Restaurant = await response.json();

            setWantToEat((prev) =>
                prev.filter((r) => r.id !== updatedRestaurant.id)
            );
            setHaveEaten((prev) => [...prev, updatedRestaurant]);

            setShowNotification({
                message: `${updatedRestaurant.name} Set to Visited.`,
                error: false,
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-6">
            {showRestaurantInput && (
                <RestaurantInput
                    // categories={categories}
                    onSubmit={newRestaurant}
                    onClose={() => setShowRestaurantInput(false)}
                />
            )}
            {showRatingInput != -1 && (
                <RatingInput
                    onSubmit={(rating) => {
                        setToVisited(showRatingInput, rating);
                    }}
                    onClose={() => {
                        setShowRatingInput(-1);
                    }}
                />
            )}
            {showNotification && (
                <>
                    <Notification
                        message={showNotification.message}
                        error={showNotification.error}
                        onClose={() => {
                            setShowNotification(undefined);
                        }}
                    />
                </>
            )}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Restaurants</h1>
                <button
                    className="bg-[#FFAFCC] text-black px-4 py-2 rounded-lg hover:bg-[#FFC8DD]"
                    onClick={() => {
                        setShowRestaurantInput(true);
                    }}
                >
                    + Add Restaurant
                </button>
            </div>

            <RestaurantsMenu
                setShowVisited={setShowVisited}
                showVisited={showVisited}
                filter={filter}
                setFilter={(filter) => {
                    setFilter(filter);
                }}
            />

            {}
            <div className="flex flex-row flex-wrap">
                {data &&
                    data.sort(filterFunctions[filter]).map((r) => (
                        <RestaurantModal
                            key={r.id}
                            restaurant={r}
                            setRestaurants={updatedRestaurant}
                            deleteRestaurants={deleteRestaurant}
                            setShowRatingInput={() => {
                                setShowRatingInput(r.id!);
                            }}
                        />
                    ))}
            </div>
        </div>
    );
}
