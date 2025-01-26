import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.{js,mjs,cjs,jsx}"], // Match js, jsx files
	},
	{
		languageOptions: {
			globals: globals.browser, // Set global variables
			parserOptions: {
				ecmaFeatures: {
					jsx: true, // Enable JSX parsing for .jsx files
				},
			},
		},
	},
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		plugins: {
			"react-hooks": fixupPluginRules(pluginReactHooks),
		},
		rules: {
			...pluginReactHooks.configs.recommended.rules,
		},
	},
	{
		settings: { react: { version: "detect" } },
		rules: {
			"react/react-in-jsx-scope": "off",

			// JSX should use React
			"react/jsx-uses-react": "error",

			// Catch unused variables in JSX
			"react/jsx-uses-vars": "error",

			// Warn about undefined variables
			"no-undef": "warn",

			// Warn about unused variables
			"no-unused-vars": "warn",

			// Warn about var usage, use let/const instead
			"no-var": "warn",

			"react-hooks/rules-of-hooks": "error", // Ensures Hooks are used correctly

			// Enforce default prop types and define them in functional components
			"react/prop-types": "warn",

			// Prevent React from being used inside useEffect or useCallback (which is often redundant)
			"react/jsx-no-duplicate-props": "warn",

			// React JSX self-closing elements like <img />, <input />
			"react/self-closing-comp": "warn",

			// Prevent the usage of `index.js` as keys in lists
			"react/no-array-index-key": "warn",

			// Check for misspelled `react` (common mistake in JSX)
			"react/jsx-pascal-case": "warn",

			// Enforce proper use of `useState` (in particular, recommend using function form of setter)
			"react/destructuring-assignment": ["warn", "always"],

			// Enforce the use of the `useEffect` hook instead of lifecycle methods like componentDidMount
			"react/no-deprecated": "warn",

			// Allow Next.js's `Image` component to use `layout="intrinsic"`
			// "next/no-img-element": "warn",

			// Disable usage of `next/head` outside of the main `pages` directory
			// "next/no-head-element": "warn",

			// Enforce return in React components
			"react/require-render-return": "error",

			// Warn if the use of `useEffect` is missing dependency array or dependencies
			"react-hooks/exhaustive-deps": "warn",
		},
	},
];
