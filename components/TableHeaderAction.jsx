import AddSvg from "@/svg/Add";
import Search from "./search";
import { Anchor, Select } from "@mantine/core";
import Link from "next/link";

export default function TableHeaderAction({
	authorId = "",
	queryValue,
	tableName,
	placeholder,
}) {
	return (
		<div className="flex justify-start items-center gap-3 mb-6 p-2 w-full ">
			{/* search */}
			<Search
				query={queryValue}
				placeholder={placeholder}
			/>
			<div className="ml-auto">
				<Anchor
					variant="filled"
					color="indigo"
					component={Link}
					className=""
					href={`/${tableName.toLowerCase()}/create?authorId=${authorId}`}>
					<span className="flex gap-0">
						<AddSvg />
						Add {tableName}
					</span>
				</Anchor>
			</div>
		</div>
	);
}
