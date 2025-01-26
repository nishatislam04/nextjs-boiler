import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends(["next/core-web-vitals",'next', 'prettier']),
	{
		files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
		rules: {
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-vars": "error",
			"no-unused-vars": "error",
		},
	},
];

export default eslintConfig;
