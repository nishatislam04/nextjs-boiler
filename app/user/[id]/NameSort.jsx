"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function NameSort() {
	const [nameSort, setNameSort] = useState("desc");
	const router = useRouter();
	const searchParams = useSearchParams();

	function handleClick() {
		const newSort = nameSort === "desc" ? "asc" : "desc";
		setNameSort(newSort);

		const params = new URLSearchParams(searchParams);
		params.set("nameSort", nameSort);
		router.push(`?${params.toString()}`);
	}
	return (
		<span
			className="flex items-center gap-2"
			onClick={handleClick}>
			Name
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
