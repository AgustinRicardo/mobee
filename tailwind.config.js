/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      openSans: ["Open Sans", "sans-serif"],
      lora: ["Lora", "serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    variants: {
      extend: { text: ["disabled"] },
    },
    extend: {
      display: ["group-hover"],
      backgroundImage: {
        loginGradient:
          "linear-gradient(270deg,#2E2928 0,rgba(46,41,40,.986) .97%,rgba(46,41,40,.945) 2.07833333%,rgba(46,41,40,.883) 3.29666667%,rgba(46,41,40,.803) 4.60166667%,rgba(46,41,40,.711) 5.96666667%,rgba(46,41,40,.61) 7.365%,rgba(46,41,40,.504) 8.77166667%,rgba(46,41,40,.398) 10.16%,rgba(46,41,40,.296) 11.505%,rgba(46,41,40,.203) 12.78%,rgba(46,41,40,.122) 13.95833333%,rgba(46,41,40,.059) 15.01666667%,rgba(46,41,40,.016) 15.92833333%,rgba(46,41,40,0) 16.66666667%)",
        gradientOverlay:
          "linear-gradient(90deg,#2E2928 0,rgba(46,41,40,.986) .97%,rgba(46,41,40,.945) 2.07833333%,rgba(46,41,40,.883) 3.29666667%,rgba(46,41,40,.803) 4.60166667%,rgba(46,41,40,.711) 5.96666667%,rgba(46,41,40,.61) 7.365%,rgba(46,41,40,.504) 8.77166667%,rgba(46,41,40,.398) 10.16%,rgba(46,41,40,.296) 11.505%,rgba(46,41,40,.203) 12.78%,rgba(46,41,40,.122) 13.95833333%,rgba(46,41,40,.059) 15.01666667%,rgba(46,41,40,.016) 15.92833333%,rgba(46,41,40,0) 16.66666667%,rgba(46,41,40,0) 83.33333333%,rgba(46,41,40,.016) 84.07166667%,rgba(46,41,40,.059) 84.98333333%,rgba(46,41,40,.122) 86.04166667%,rgba(46,41,40,.203) 87.22%,rgba(46,41,40,.296) 88.495%,rgba(46,41,40,.398) 89.84%,rgba(46,41,40,.504) 91.22833333%,rgba(46,41,40,.61) 92.635%,rgba(46,41,40,.711) 94.03333333%,rgba(46,41,40,.803) 95.39833333%,rgba(46,41,40,.883) 96.70333333%,rgba(46,41,40,.945) 97.92166667%,rgba(46,41,40,.986) 99.03%,#2E2928),linear-gradient(0deg,#2E2928 0,#2E2928 21.48148148%,rgba(46,41,40,.986) 23.63703704%,rgba(46,41,40,.945) 26.1%,rgba(46,41,40,.883) 28.80740741%,rgba(46,41,40,.803) 31.70740741%,rgba(46,41,40,.711) 34.74074074%,rgba(46,41,40,.61) 37.84814815%,rgba(46,41,40,.504) 40.97407407%,rgba(46,41,40,.398) 44.05925926%,rgba(46,41,40,.296) 47.04814815%,rgba(46,41,40,.203) 49.88148148%,rgba(46,41,40,.122) 52.5%,rgba(46,41,40,.059) 54.85185185%,rgba(46,41,40,.016) 56.87777778%,rgba(46,41,40,0) 58.51851852%)",
      },
      colors: {
        beeRed: "#BE5C5B",
        beeKaki: "#D9BE6C",
        beeYellow: "#F2C53D",
        beeBeig: "#F6EAC4",
        beeBrownLight: "#7A6D6A",
        beeBrownLightText: "#544B49",
        beeBrownBackground: "#2E2928",
        beeBrownHeader: "#252120",
        beeBrownLightDarker: "#473f3D",
        border: "#7A6D6A",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
