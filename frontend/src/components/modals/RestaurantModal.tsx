import { useState } from "react";
import type { Restaurant } from "../../types/Restaurant";
import ModalLayout from "./ModalLayout";
import RatingInput from "../forms/RatingInput";

type RestaurantModalProps = {
  restaurant: Restaurant;
  setShowRatingInput: () => void;
};

export default function RestaurantModal({
  restaurant,
  setShowRatingInput,
}: RestaurantModalProps) {
  const getPriceSymbol = (val: number): string => {
    if (val <= 20) return "$";
    if (val <= 60) return "$$";
    return "$$$";
  };
  const priceSymbol = getPriceSymbol(restaurant.price);

  return (
    <ModalLayout>
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          {restaurant.name}
        </h1>
        <div className="text-sm text-gray-500 italic">
          {restaurant.location}
        </div>
      </div>

      {/* Category + Price Tag */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        <span className="bg-gray-100 px-2 py-1 rounded-md">
          {restaurant.category}
        </span>
        <span className="text-[#FF5D8F]">{priceSymbol}</span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm leading-relaxed">
        {restaurant.description}
      </p>

      {/* Visited / Not Visited Area */}
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
            <span className="text-sm text-gray-500">Your Rating:</span>
            <span className="text-lg font-bold text-yellow-500">
              {restaurant.rating} ★
            </span>
          </div>
        )}
      </div>
    </ModalLayout>
  );
}
