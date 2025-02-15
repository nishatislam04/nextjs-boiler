import Pagination from "@/components/ui/Pagination";
import TableHeaderAction from "@/components/TableHeaderAction";
import GoBack from "@/components/ui/GoBack";
import React, { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import Toast from "@/components/ui/Toast";
import { CURRENT_PAGE, PER_PAGE } from "@/lib/settings";
import {
	fetchTotalPostsUserCount,
	fetchUserPosts,
} from "@/lib/repository/user/dal";
import helpers from "@/lib/helpers";
import UserPostListingsTable from "./Table";
import sessionHelper from "@/lib/sessionHelper";
import NotAuthenticated from "@/components/ui/auth/NotAuthenticated";
import NotAuthorized from "@/components/ui/auth/NotAuthorized";
import { authenticateUser, checkAuthAndRoles } from "@/lib/authHelper";
import { SessionProvider } from "next-auth/react";
import UserProvider from "@/context/AuthUserContext";

export default async function UserPostPage({ searchParams }) {
	const searchQuery = await searchParams;
	const id = searchQuery.id;
	const authUser = await checkAuthAndRoles(`/user/posts/${id}`);
	if (React.isValidElement(authUser)) return authUser;

	const itemPerPage = PER_PAGE;
	const queryBy = searchQuery?.queryBy || "";
	const query = searchQuery?.query || "";
	const currentPage = searchQuery?.page || CURRENT_PAGE;
	const titleSorting = { title: searchQuery?.titleSorting || null };
	const publishedSorting = {
		published: searchQuery?.publishedSorting || null,
	};
	const createdAtSorting = {
		createdAt: searchQuery?.createdatSorting || null,
	};
	const orderBy = helpers.sortData(
		[titleSorting, publishedSorting, createdAtSorting],
		{
			createdAt: "desc",
		}
	);

	const user = await fetchUserPosts(
		currentPage,
		id,
		orderBy,
		query,
		queryBy
	);
	let { totalPages } = await fetchTotalPostsUserCount(id);
	totalPages = Math.ceil(totalPages / itemPerPage);

	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<div className="mt-12 mb-8 absolute -top-24 right-2">
					<GoBack />
				</div>{" "}
				<Toast />
				<Suspense fallback={<Spinner />}>
					<div className="min-h-[27rem]">
						<SessionProvider>
							<UserProvider>
								<UserPostListingsTable posts={user.posts}>
									<TableHeaderAction
										selectPlaceHolder="Search For"
										selectData={[
											{ value: "title", label: "Title" },
											{ value: "shortDescription", label: "Description" },
										]}
										defaultSelectedData={{
											value: "title",
											label: "Title",
										}}
										queryPlaceholder="Search for post title"
										authorId={user.id}
										queryValue={query}
										tableName="post"
									/>
								</UserPostListingsTable>
							</UserProvider>
						</SessionProvider>
					</div>
				</Suspense>
				<Pagination
					uri={user.id} // uri: /post/cm66j0ikt0000pf1cp89q5her?page=1
					totalPages={totalPages}
					currentPage={currentPage}
				/>
			</div>
		</div>
	);
}
