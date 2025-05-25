import { useEffect } from "react";

type NotificationProps = {
  message: string;
  error: boolean;
  onClose: () => void;
};

export default function Notification({
  message,
  error,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 rounded-lg px-4 py-3 shadow-lg text-white ${
        error ? "bg-red-500" : "bg-green-500"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white font-bold hover:opacity-80"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
