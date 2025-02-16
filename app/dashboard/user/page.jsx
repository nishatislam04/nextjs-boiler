import Pagination from "@/components/ui/Pagination";
import React, { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import Toast from "@/components/ui/Toast";
import TableHeaderAction from "@/components/TableHeaderAction";
import { fetchAll, fetchTotalCount } from "@/lib/repository/user/dal";
import { CURRENT_PAGE, PER_PAGE } from "@/lib/settings";
import helpers from "@/lib/helpers";
import UserListingsTable from "./Table";
import { checkAuthAndRoles } from "@/lib/authHelper";
import { SessionProvider } from "next-auth/react";
import UserProvider from "@/context/AuthUserContext";

export default async function UserPage({ searchParams }) {
	const authUser = await checkAuthAndRoles("/dashboard/user");
	if (React.isValidElement(authUser)) return authUser;

	const params = await searchParams;
	const searchQuery = params?.query || "";
	const queryBy = params?.queryBy || "";
	const currentPage = params?.page || CURRENT_PAGE;
	const nameSort = { name: params?.nameSorting || null };
	const emailSort = { email: params?.emailSorting || null };
	const orderBy = helpers.sortData([nameSort, emailSort], { name: "asc" });

	let users = null;
	users = await fetchAll(currentPage, searchQuery, queryBy, orderBy);
	let totalUsers = await fetchTotalCount();
	const totalPages = Math.ceil(totalUsers / PER_PAGE);

	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<Toast />

			<Suspense fallback={<Spinner />}>
				<div className="min-h-[27rem]">
					<SessionProvider>
						<UserProvider>
							<UserListingsTable users={users}>
								<TableHeaderAction
									selectPlaceHolder="Search For"
									selectData={[
										{ value: "name", label: "Name" },
										{ value: "email", label: "Email" },
									]}
									defaultSelectedData={{ value: "name", label: "Name" }}
									queryValue={searchQuery}
									queryPlaceholder="Search for user"
									tableName="User"
								/>
							</UserListingsTable>
						</UserProvider>
					</SessionProvider>
				</div>
			</Suspense>

			<Pagination
				uri="user"
				totalPages={totalPages}
				currentPage={currentPage}
			/>
		</div>
	);
}
