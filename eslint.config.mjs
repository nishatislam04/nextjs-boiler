import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(["next/core-web-vitals", "next", "prettier"]),
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: false, // Use single quotes instead of double quotes
          endOfLine: "auto", // Maintain consistent end of line behavior across environments
          semi: false, // Omit semicolons at the end of statements
        },
      ], // Prevent conflicts between Prettier and Airbnb ESLint rules
    },
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parser: "@babel/eslint-parser",
    plugins: ["react"],
  },
];

export default eslintConfig;
