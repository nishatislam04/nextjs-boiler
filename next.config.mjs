/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
		authInterrupts: true,
	},

	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "/u/**",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com", // Added Unsplash hostname
				pathname: "/**", // Allow all paths from this hostname
			},
			{
				protocol: "https", // Allow images from Google UserContent
				hostname: "lh3.googleusercontent.com", // Add this line
				pathname: "/**", // Allow all paths from this hostname
			},
		],
	},
};

export default nextConfig;
