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
		<section className="flex items-center justify-start w-full gap-3 py-3">
			{/* search */}
			<Search
				selectPlaceHolder={selectPlaceHolder}
				selectData={selectData}
				queryValue={queryValue}
				queryPlaceholder={queryPlaceholder}
				defaultSelectedData={defaultSelectedData}
			/>

			{/* create button */}
			<AuthorizedView
				pathname={
					tableName.toLowerCase() === "user"
						? `/dashboard/user/create`
						: `/${tableName.toLowerCase()}/create`
				}>
				<section className="ml-auto">
					<Anchor
						variant="filled"
						color="indigo"
						component={Link}
						href={
							tableName.toLowerCase() === "user"
								? `/dashboard/user/create`
								: `/post/create?id=${authorId}`
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
				</section>
			</AuthorizedView>
		</section>
	);
}
