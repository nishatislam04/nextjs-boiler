// "use client";
// import { useState } from "react";
// import { useForm } from "@mantine/form";
// import { usePathname } from "next/navigation";
import SearchSvg from "@/components/svg/Search";
// import { CloseButton, Select } from "@mantine/core";
// import { useRouter } from "next/navigation";
import FormSelect from "./FormSelect";

export default function Search({
	query,
	placeholder = "search for resource",
}) {
	// const router = useRouter();
	return (
		<form className="flex w-[30rem] justify-start">
			<div className="flex gap-2">
				<FormSelect
					value="title"
					dropdownData={["title"]}
				/>

				<div className="relative flex w-full items-center gap-1">
					<SearchSvg />
					<input
						type="text"
						// type="submit"
						id="default-search"
						name="query"
						className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 ps-10 text-sm text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus-visible:outline-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
						placeholder={placeholder}
						defaultValue={query}
					/>
				</div>
			</div>
		</form>
	);
}

{
	/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
	<svg
							className="w-4 h-4 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
</div>; */
}
{
	/* <input
            type="text"
            id="default-search"
            name="query"
            className="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            defaultValue={query}
          /> */
}

// mantine
{
	/* <Input
	type="text"
	// value={value}
	// onChange={(event) => setValue(event.currentTarget.value)}
	rightSectionPointerEvents="all"
	leftSection={<SearchSvg />}
	size="xs"
	radius="md"
	// name="query"
	placeholder={placeholder}
	// rightSection={
	// 	<CloseButton
	// 		aria-label="Clear input"
	// 		onClick={() => setValue("")}
	// 		style={{ display: value ? undefined : "none" }}
	// 	/>
	// }
	{...form.getInputProps("query")}
/>; */
}
