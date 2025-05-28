export default function CloseButton({
    onClose,
}: {
    onClose: (set: boolean) => void;
}) {
    return (
        <button
            onClick={() => onClose(true)}
            className="p-2 rounded hover:bg-white/30 transition-colors"
            aria-label="Edit"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                />
            </svg>
        </button>
    );
}
