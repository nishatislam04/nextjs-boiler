"use client";
import SearchSvg from "@/components/svg/Search";
import FormSelect from "./FormSelect";
import { Button } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { IconRestore, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function Search({
	selectPlaceHolder,
	selectData,
	queryValue,
	queryPlaceholder = "search for resource",
	defaultSelectedData,
}) {
	const [searchQuery, setSearchQuery] = useState(queryValue || "");
	const [selectedOption, setSelectedOption] = useState(
		defaultSelectedData
	);

	const router = useRouter();
	const pathname = usePathname();

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent the form from reloading the page

		// Get the current query parameters (preserving all existing params)
		const url = new URL(window.location.href); // Get the current URL
		const params = new URLSearchParams(url.search); // Get the query params

		// Set the 'page' query parameter to 1 (overwriting the current page value or adding it if missing)
		params.set("page", 1);

		// Update the query parameters with the form data (search query and selected option)
		params.set("query", searchQuery);
		params.set("queryBy", selectedOption.value);

		// The new URL with all existing query params plus the new ones
		const updatedUrl = `${url.pathname}?${params.toString()}`;

		// Push the updated URL to the router, preserving the page state
		router.push(updatedUrl, undefined, { shallow: true });
	};

	function handleSelectedDataChange(_value, option) {
		setSelectedOption(option);
	}

	const handleReset = () => {
		// Get the current URL and query parameters
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);

		// Reset query, queryBy, and page query params
		params.set("query", "");
		params.set("queryBy", defaultSelectedData.value); // Reset queryBy to the default selected option
		params.set("page", 1); // Reset page to 1

		// Construct the updated URL with the modified query params
		const updatedUrl = `${url.pathname}?${params.toString()}`;

		// Use router.replace to update the URL without adding a new entry in the history
		router.replace(updatedUrl, undefined, { shallow: true });

		// Optionally reset the state in the component
		setSearchQuery("");
		setSelectedOption(defaultSelectedData);
	};

	return (
		<form
			className="flex w-[35rem] justify-start"
			onSubmit={handleSubmit}>
			<div className="flex gap-2">
				<FormSelect
					name="queryBy"
					selectPlaceHolder={selectPlaceHolder}
					selectData={selectData}
					value={selectedOption.value} // Make sure this is a controlled component
					onChange={handleSelectedDataChange} // Update selected option
				/>

				<div className="relative flex w-full items-center gap-1">
					<SearchSvg />
					<input
						type="text"
						id="default-search"
						name="query"
						className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 ps-10 text-sm text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus-visible:outline-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
						placeholder={queryPlaceholder}
						value={searchQuery} // Controlled input
						onChange={(e) => setSearchQuery(e.target.value)} // Update search query
					/>
				</div>
				<Button
					className="min-w-[3rem] opacity-50"
					type="submit"
					variant="filled"
					color="gray"
					size="xs">
					<IconSearch />
				</Button>
				<Button
					className="min-w-[3rem] opacity-50"
					variant="filled"
					color="pink"
					onClick={handleReset}
					size="xs">
					<IconRestore />
				</Button>
			</div>
		</form>
	);
}
