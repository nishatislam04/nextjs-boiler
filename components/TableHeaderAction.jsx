import AddSvg from "@/components/svg/Add";
import Search from "./form/search";
import { Anchor, Button } from "@mantine/core";
import Link from "next/link";

export default function TableHeaderAction({
	authorId = "",
	queryValue,
	tableName,
	placeholder,
}) {
	return (
		<div className="mb-6 flex w-full items-center justify-start gap-3 p-2">
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
						<Button
							size="xs"
							variant="filled"
							color="violet">
							<AddSvg />
							Add {tableName}
						</Button>
					</span>
				</Anchor>
			</div>
		</div>
	);
}
