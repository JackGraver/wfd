import { useEffect, useState } from "react";

export default function LightDarkToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="relative w-14 h-8 rounded-full border border-gray-400 dark:border-gray-500 flex items-center px-1 transition-colors"
            aria-label="Toggle Light/Dark Mode"
        >
            <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md transform transition-all duration-300
                    ${
                        isDark
                            ? "translate-x-6 bg-gray-600 text-white"
                            : "translate-x-0 bg-yellow-400 text-yellow-900"
                    }`}
            >
                {isDark ? <DarkSVG /> : <LightSVG />}
            </div>
        </button>
    );
}

function LightSVG() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
        </svg>
    );
}

function DarkSVG() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
        </svg>
    );
}
