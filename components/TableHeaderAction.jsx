import AddSvg from "@/components/svg/Add";
import Search from "./form/search";
import { Anchor, Button } from "@mantine/core";
import Link from "next/link";
import AuthorizedView from "./ui/auth/AuthorizedView";

export default function TableHeaderAction({
	authorId = "",
	queryValue,
	tableName,
	queryPlaceholder,
	selectPlaceHolder,
	selectData,
	defaultSelectedData,
}) {
	return (
		<div className="mb-6 flex w-full items-center justify-start gap-3 p-2">
			{/* search */}
			<Search
				selectPlaceHolder={selectPlaceHolder}
				selectData={selectData}
				queryValue={queryValue}
				queryPlaceholder={queryPlaceholder}
				defaultSelectedData={defaultSelectedData}
			/>
			<AuthorizedView
				// pathname={`/dashboard/${tableName.toLowerCase()}/create`}>
				pathname={
					tableName.toLowerCase() === "user"
						? `/dashboard/user/create`
						: `/${tableName.toLowerCase()}/create`
				}>
				<div className="ml-auto">
					<Anchor
						variant="filled"
						color="indigo"
						component={Link}
						className=""
						// href={`/dashboard/${tableName.toLowerCase()}/create?authorId=${authorId}`}
						href={
							tableName.toLowerCase() === "user"
								? `/dashboard/user/create`
								: `/post/create`
						}
						prefetch>
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
			</AuthorizedView>
		</div>
	);
}
