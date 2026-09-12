import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        emergency: "#b91c1c",
        urgent: "#c2410c",
        nonurgent: "#0f766e",
        info: "#1d4ed8",
      },
    },
  },
  plugins: [],
} satisfies Config;
