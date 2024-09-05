// import type { Config } from "tailwindcss";
import {color, colorsType, fontSize, fontSizeType} from "./styles";

const config: {
  plugins: any[];
  theme: {
    extend: { backgroundImage: { "gradient-conic": string; "gradient-radial": string } };
    fontSize: fontSizeType
    colors: colorsType
  };
  content: string[]
} = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: color,
    fontSize: fontSize,
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
