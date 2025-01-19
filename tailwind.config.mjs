/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	safelist: [
		{
			pattern:
				/bg-(gray|blue|red|green|yellow|indigo|purple|pink)-(500|600|700|800)/,
			variants: ["hover", "focus", "dark"],
		},
		{
			pattern:
				/focus:ring-(gray|blue|red|green|yellow|indigo|purple|pink)-(300|800)/,
		},
	],
	plugins: [require("flowbite/plugin")],
};
