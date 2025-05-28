import InputPopup from "./InputPopup";

type DeleteInputProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

export default function DeleteInput({ onConfirm, onCancel }: DeleteInputProps) {
    return (
        <InputPopup>
            <div className="text-center space-y-4">
                <h2 className="text-lg font-semibold">
                    Are you sure you want to delete?
                </h2>
                <div className="flex justify-center space-x-2 mt-4">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </InputPopup>
    );
}
