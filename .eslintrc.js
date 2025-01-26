module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals", // Use Next.js-specific linting
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // Turn off the rule requiring React in scope
    "react/prop-types": "off", // Turn off prop-types validation if you're using TypeScript
    "no-unused-vars": "warn", // Warn about unused variables
  },
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },
};
