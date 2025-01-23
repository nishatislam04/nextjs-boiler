import { build } from "bun";

await build({
	entrypoints: ["./node_modules/flowbite/lib/esm/index.js"], // Source file
	outdir: "./public/js/flowbite/", // Output directory
	minify: true, // Enable minification
	format: "iife", // Use IIFE for browser compatibility
	target: "browser", // Target environment is the browser
}).then(() => console.log("Flowbite bundled successfully!"));
