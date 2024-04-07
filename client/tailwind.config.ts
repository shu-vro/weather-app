import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    prefix: "",
    theme: {
        extend: {
            colors: {
                accent: "#CBE7EB",
                card: "#2E2E38",
                border: "#363640",
            },
        },
    },
    plugins: [
        nextui({
            themes: {
                dark: {
                    colors: {
                        primary: {
                            foreground: "#000",
                            DEFAULT: "#CBE7EB",
                        },
                        default: {
                            100: "#2E2E38",
                        },
                        background: {
                            foreground: "#babed3",
                            DEFAULT: "#1F2024",
                        },
                    },
                },
            },
        }),
    ],
} satisfies Config;

export default config;
