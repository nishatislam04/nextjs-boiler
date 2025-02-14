"use client";
import SearchSvg from "@/components/svg/Search";
import FormSelect from "./FormSelect";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconRestore, IconSearch } from "@tabler/icons-react";

export default function Search({
	selectPlaceHolder,
	selectData,
	queryValue,
	queryPlaceholder = "search for resource",
	defaultSelectedData,
}) {
	const router = useRouter();
	function handleReset() {
		router.replace("?");
	}
	return (
		<form className="flex w-[35rem] justify-start">
			<div className="flex gap-2">
				<FormSelect
					name="queryBy"
					selectPlaceHolder={selectPlaceHolder}
					selectData={selectData}
					defaultSelectedData={defaultSelectedData}
				/>

				<div className="relative flex w-full items-center gap-1">
					<SearchSvg />
					<input
						type="text"
						id="default-search"
						name="query"
						className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 ps-10 text-sm text-gray-900 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus-visible:outline-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
						placeholder={queryPlaceholder}
						defaultValue={queryValue}
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
