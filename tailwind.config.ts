import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#FFFFFF",
          subtle: "#F8F8F8",
          muted: "#F5F5F5",
        },
        ink: {
          DEFAULT: "#0A0A0A",
          body: "#1A1A1A",
          muted: "#6B6B6B",
          subtle: "#9CA3AF",
        },
        hairline: "#E5E5E5",
        accent: {
          DEFAULT: "#00D66C",
          hover: "#00C25F",
          ink: "#001A0D",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "step--2": "clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)",
        "step--1": "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)",
        "step-0": "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
        "step-1": "clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem)",
        "step-2": "clamp(1.75rem, 1.5rem + 1.2vw, 2.25rem)",
        "step-3": "clamp(2.5rem, 2rem + 2.5vw, 3.5rem)",
        "step-4": "clamp(3rem, 2rem + 5vw, 6rem)",
        "step-5": "clamp(4.5rem, 3rem + 7.5vw, 9rem)",
      },
      spacing: {
        gutter: "clamp(20px, 4vw, 48px)",
        "section-y": "clamp(64px, 8vw, 128px)",
        "safe-top": "env(safe-area-inset-top, 0px)",
        "safe-bottom": "env(safe-area-inset-bottom, 0px)",
      },
      screens: {
        xs: "360px",
      },
      maxWidth: {
        container: "1440px",
        prose: "58ch",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quart": "cubic-bezier(0.65, 0, 0.35, 1)",
        "spring-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "220ms",
        slow: "400ms",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,10,10,0.04), 0 8px 24px -12px rgba(10,10,10,0.08)",
        hover: "0 2px 4px rgba(10,10,10,0.06), 0 16px 40px -16px rgba(10,10,10,0.12)",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
      },
      letterSpacing: {
        display: "-0.035em",
        tight: "-0.015em",
        body: "-0.005em",
        caps: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
