/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},

	images: {
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
				hostname: "xsgames.co",
				port: "",
				pathname: "/randomusers/avatar.php",
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
				protocol: "https",
				hostname: "picsum.photos",
				pathname: "/**",
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
