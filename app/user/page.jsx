import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import TableHeaderAction from "@/components/TableHeaderAction";
import { fetchAll, fetchTotalCount } from "@/repository/user/dal";
import { CURRENT_PAGE, PER_PAGE } from "@/config/settings";
import { sortData } from "@/lib/helpers";
import UserListingsTable from "./Table";

export default async function UserPage({ searchParams }) {
	const params = await searchParams;
	const searchQuery = params?.query || "";
	const currentPage = params?.page || CURRENT_PAGE;
	const nameSort = { name: params?.nameSorting || null };
	const emailSort = { email: params?.emailSorting || null };
	const orderBy = sortData([nameSort, emailSort], { name: "asc" });

	let users = null;
	users = await fetchAll(currentPage, searchQuery, orderBy);
	let totalUsers = await fetchTotalCount();
	const totalPages = Math.ceil(totalUsers / PER_PAGE);

	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<Toast />

			<TableHeaderAction
				queryValue={searchQuery}
				tableName="User"
			/>

			<Suspense fallback={<Spinner />}>
				<UserListingsTable users={users} />
			</Suspense>

			<Pagination
				uri="user"
				totalPages={totalPages}
				currentPage={currentPage}
			/>
		</div>
	);
}
