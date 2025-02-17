"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@mantine/core";
import {
	IconArrowBarToRight,
	IconArrowBarToLeft,
	IconArrowLeft,
	IconArrowRight,
	IconGripHorizontal,
} from "@tabler/icons-react";
import Logger from "@/lib/logger";

export default function MantinePagination({
	uri,
	totalPages,
	currentPage,
}) {
	const router = useRouter();

	// Helper function to append page param to any existing query params
	const appendPageParam = (uri, page) => {
		const url = new URL(uri, window.location.origin); // Base URL for the URI
		const params = new URLSearchParams(url.search);

		// Add or update the 'page' parameter
		params.set("page", page);

		return `${url.pathname}?${params.toString()}`; // Return the updated URL with all params
	};

	const handlePageChange = (page) => {
		// Use the appendPageParam function to modify the URL with the page parameter
		const updatedUri = appendPageParam(uri, page);
		router.push(updatedUri); // Navigate to the updated URL
	};

	return (
		<div className="flex justify-center mt-2">
			<Pagination
				total={totalPages}
				value={+currentPage}
				onChange={handlePageChange}
				color="gray"
				size="sm"
				radius="xl"
				nextIcon={IconArrowRight}
				previousIcon={IconArrowLeft}
				firstIcon={IconArrowBarToLeft}
				lastIcon={IconArrowBarToRight}
				dotsIcon={IconGripHorizontal}
			/>
		</div>
	);
}
