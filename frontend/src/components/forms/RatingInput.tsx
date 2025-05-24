import { useState } from "react";
import type { Restaurant } from "../../types/Restaurant";
import InputPopup from "./InputPopup";

type RatingInputProps = {
  onSubmit: (...args: any[]) => void;
  onClose: () => void;
};

export default function RatingInput({ onSubmit, onClose }: RatingInputProps) {
  const [rating, setRating] = useState(0);

  return (
    <InputPopup>
      <h2 className="text-xl font-semibold mb-4">
        How would you rate the restaurant
      </h2>
      <form
        onSubmit={() => {
          onSubmit(rating);
        }}
        className="flex flex-col space-y-3"
      >
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={rating}
          min={0}
          max={5}
          onChange={(e) => setRating(parseInt(e.target.value))}
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
