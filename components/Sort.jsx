"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Sort({ children }) {
	const sortNaming = `${children
		.trim()
		.replaceAll(" ", "")
		.toLowerCase()}Sorting`; // e.g., 'nameSorting' or 'emailSorting'
	const [sort, setSort] = useState("desc");
	const router = useRouter();
	const searchParams = useSearchParams();

	function handleClick() {
		const newSort = sort === "desc" ? "asc" : "desc"; // Toggle between 'asc' and 'desc'
		setSort(newSort);

		const params = new URLSearchParams(searchParams);

		// Remove any existing sorting query parameters
		for (const key of params.keys()) {
			if (key.endsWith("Sorting")) {
				params.delete(key);
			}
		}

		// Add the new sorting query parameter
		params.set(sortNaming, newSort);

		// Update the URL with the new query string
		router.push(`?${params.toString()}`);
	}

	return (
		<span
			className="flex items-center gap-2 cursor-pointer"
			onClick={handleClick}>
			{children}
			<svg
				className="w-4 h-4"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24">
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="m8 15 4 4 4-4m0-6-4-4-4 4"
				/>
			</svg>
		</span>
	);
}
