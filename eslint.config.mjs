import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: "eslint:recommended",
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "plugin:react/recommended"),
	{
		rules: {
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "error",
			"react/jsx-uses-vars": "error",
			"no-console": "warn",
			"no-undef": "warn",
			"no-unused-vars": "warn",
			"no-var": "warn",
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true, // Enable JSX syntax support
				},
			},
		},
	},
];

export default eslintConfig;
