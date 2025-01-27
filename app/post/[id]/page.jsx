import Pagination from "@/components/ui/Pagination";
import TableHeaderAction from "@/components/TableHeaderAction";
import GoBack from "@/components/ui/GoBack";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import Toast from "@/components/ui/Toast";
import { CURRENT_PAGE, PER_PAGE } from "@/lib/config/settings";
import {
	fetchTotalPostsUserCount,
	fetchUserPosts,
} from "@/lib/repository/user/dal";
import helpers from "@/lib/helpers";
import UserPostListingsTable from "./Table";

export default async function PostPage({ params, searchParams }) {
	const id = (await params).id;
	const itemPerPage = PER_PAGE;
	const searchQuery = await searchParams;
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

	const user = await fetchUserPosts(currentPage, id, orderBy, query);
	let { totalPages } = await fetchTotalPostsUserCount(id);
	totalPages = Math.ceil(totalPages / itemPerPage);

	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<GoBack />
				<Toast />

				<TableHeaderAction
					placeholder="Search for post title"
					authorId={user.id}
					queryValue={query}
					tableName="post"
				/>

				<Suspense fallback={<Spinner />}>
					<UserPostListingsTable posts={user.posts} />
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
