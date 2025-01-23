/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "next/core-web-vitals", // Default Next.js ESLint rules
    "plugin:tailwindcss/recommended", // TailwindCSS recommended rules
  ],
  settings: {
    tailwindcss: {
      callees: ["twMerge", "createTheme"], // Functions to check for Tailwind classes
      classRegex: "^(class(Name)?|theme)?$", // Regex for identifying Tailwind class usage
    },
  },
  plugins: ["tailwindcss"], // Add the TailwindCSS plugin
  rules: {
    // Customize rules if needed
  },
};
