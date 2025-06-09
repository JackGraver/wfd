import { useEffect, useRef, useState } from "react";
import CloseButton from "./forms/CloseButton";

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
    const duration = 3000;
    const [progress, setProgress] = useState(100);
    const [isPaused, setIsPaused] = useState(false);

    const startTimeRef = useRef<number | null>(null);
    const pauseTimeRef = useRef<number | null>(null);
    const frameRef = useRef<number | null>(null);

    const animate = (timestamp: number) => {
        if (isPaused) return;

        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const remaining = Math.max(duration - elapsed, 0);
        const newProgress = (remaining / duration) * 100;
        setProgress(newProgress);

        if (remaining <= 0) {
            onClose();
        } else {
            frameRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current !== null) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []); // <- Run only once

    const handleMouseEnter = () => {
        setIsPaused(true);
        if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current);
        }
        pauseTimeRef.current = performance.now();
    };

    const handleMouseLeave = () => {
        if (pauseTimeRef.current && startTimeRef.current) {
            const pausedDuration = performance.now() - pauseTimeRef.current;
            startTimeRef.current += pausedDuration; // Adjust start time
        }
        setIsPaused(false);
        frameRef.current = requestAnimationFrame(animate);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`fixed bottom-4 right-4 rounded-lg px-4 py-3 shadow-lg text-black ${
                error ? "bg-red-500" : "bg-green-500"
            }`}
        >
            <div className="flex items-center justify-between gap-4 text-white text-xl">
                <span>{message}</span>
                <CloseButton onClose={onClose} />
            </div>
            <div className="bg-white/50 rounded-full h-1 mt-2 overflow-hidden">
                <div
                    className="bg-white h-full"
                    style={{
                        width: `${progress}%`,
                        transition: isPaused ? "none" : "width 0.1s linear",
                    }}
                />
            </div>
        </div>
    );
}
