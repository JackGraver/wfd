import { useEffect, useState } from "react";
import type { Restaurant } from "../../types/Restaurant";
import ModalLayout from "./ModalLayout";
import RestaurantInput from "../forms/RestaurantInput";
import { deleteRestaurant, updateRestaurant } from "../../utils/RestaurantAPI";
import DeleteInput from "../forms/DeleteInput";
import Notification from "../Notification";
import type { NotificationInfo } from "../../types/NotificationInfo";

type RestaurantModalProps = {
    restaurant: Restaurant;
    setRestaurants: (r: Restaurant) => void;
    deleteRestaurants: (id: number) => void;
    setShowRatingInput: () => void;
};

export default function RestaurantModal({
    restaurant,
    setRestaurants,
    deleteRestaurants,
    setShowRatingInput,
}: RestaurantModalProps) {
    const [showEditInput, setShowEditInput] = useState(false);
    const [showDeleteInput, setShowDeleteInput] = useState(false);
    const [showNotification, setShowNotification] =
        useState<NotificationInfo>();

    useEffect(() => {
        console.log("sn", showNotification);
    }, [showNotification]);

    const getPriceSymbol = (val: number): string => {
        if (val <= 20) return "$";
        if (val <= 60) return "$$";
        return "$$$";
    };
    const priceSymbol = getPriceSymbol(restaurant.price);

    const updRestaurant = async (restaurant: Restaurant) => {
        updateRestaurant(restaurant)
            .then((data) => {
                setRestaurants(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const delRestaurant = async (id: number | undefined) => {
        if (!id) return;

        deleteRestaurant(id)
            .then((_) => {
                deleteRestaurants(id);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <ModalLayout onEdit={setShowEditInput} onDelete={setShowDeleteInput}>
            {showEditInput && (
                <RestaurantInput
                    // categories={[]}
                    onSubmit={updRestaurant}
                    onClose={() => {
                        setShowEditInput(false);
                    }}
                    editRestarant={restaurant}
                />
            )}
            {showDeleteInput && (
                <DeleteInput
                    onConfirm={() => {
                        delRestaurant(restaurant.id);
                    }}
                    onCancel={() => setShowDeleteInput(false)}
                />
            )}
            {showNotification && (
                <Notification
                    message={showNotification.message}
                    error={showNotification.error}
                    onClose={() => {
                        setShowNotification(undefined);
                    }}
                />
            )}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                    {restaurant.name}
                </h1>
                <div className="text-sm text-gray-500 italic">
                    {restaurant.location}
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <div className="">
                    {restaurant.categories?.map((c) => (
                        <span
                            className="bg-gray-100 px-2 py-1 mr-2 rounded-md"
                            key={c.id}
                        >
                            {c.name}
                        </span>
                    ))}
                </div>
                <span className="text-[#FF5D8F]">{priceSymbol}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
                {restaurant.description}
            </p>
            <div className="mt-2">
                {!restaurant.visited ? (
                    <button
                        className="w-full mt-3 bg-[#FFAFCC] hover:bg-[#FFC8DD] text-black font-semibold py-2 px-4 rounded-lg transition-all duration-150"
                        onClick={setShowRatingInput}
                    >
                        Mark as Visited
                    </button>
                ) : (
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 text-yellow-500 text-2xl">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i}>
                                    {i < restaurant.rating ? "★" : "☆"}
                                </span>
                            ))}
                            <span className="ml-1 text-gray-600 text-xl font-medium">
                                {restaurant.rating}/5
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </ModalLayout>
    );
}
