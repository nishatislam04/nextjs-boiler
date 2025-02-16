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
import { checkAuthAndRoles } from "@/lib/authHelper";
import { SessionProvider } from "next-auth/react";
import UserProvider from "@/context/AuthUserContext";
import Logger from "@/lib/logger";

/**
 * USER PERSONAL POST LISTINGS
 *
 * @param param0 - USERID
 */
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
		<main className="relative flex flex-col items-center min-h-[calc(90vh-var(--nav-height))] mx-auto max-w-screen-xl mt-12">
			{/* go back */}
			<section className="absolute right-0 -top-8">
				<GoBack />
			</section>
			<Toast />

			<Suspense fallback={<Spinner />}>
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
								authorId={id}
								queryValue={query}
								tableName="post"
							/>
						</UserPostListingsTable>
					</UserProvider>
				</SessionProvider>
			</Suspense>

			<Pagination
				uri={`/post?id=${id}`}
				totalPages={totalPages}
				currentPage={currentPage}
			/>
		</main>
	);
}
