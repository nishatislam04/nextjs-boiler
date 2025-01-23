import Pagination from "@/components/Pagination";
import Search from "@/components/search";
import prisma from "@/prisma/db";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import AddSvg from "@/svg/Add";
import TableAction from "@/components/TableAction";
import TableCheckbox from "@/components/TableCheckbox";
import TableHeader from "@/components/TableHeader";
import TableHeaderAction from "@/components/TableHeaderAction";
import GoBack from "@/components/GoBack";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import UserTable from "@/components/Table";
import Table from "@/components/Table";
import { format } from "date-fns";
import Toast from "@/components/Toast";
import { deletePost } from "@/actions/posts/delete";
import { ScrollArea } from "@mantine/core";

async function fetchPosts(currentPage, itemPerPage, id, orderBy, query) {
	const posts = await prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			_count: {
				select: {
					posts: true,
				},
			},
			posts: {
				where: {
					title: {
						contains: query,
					},
				},
				orderBy,
				skip: (currentPage - 1) * itemPerPage,
				take: itemPerPage,
			},
		},
	});

	return posts;
}

export default async function PostPage({ params, searchParams }) {
	const id = (await params).id;
	const itemPerPage = 3;
	const searchQuery = await searchParams;
	const query = searchQuery?.query || "";
	const currentPage = searchQuery?.page || 1;
	const titleSorting = searchQuery?.titleSorting || null;
	const publishedSorting = searchQuery?.publishedSorting || null;
	const createdAtSorting = searchQuery?.createdatSorting || null;

	// Set sorting logic
	const orderBy = titleSorting
		? { title: titleSorting } // Sort by title if it exists
		: publishedSorting
			? { published: publishedSorting } // Sort by published if it exists and titleSorting does not
			: { createdAt: createdAtSorting || "desc" }; // Default to createdAt in descending order

	const posts = await fetchPosts(
		currentPage,
		itemPerPage,
		id,
		orderBy,
		query
	);

	const totalPages = Math.ceil(posts._count.posts / itemPerPage);

	if (!posts.posts) return <p>no posts found for this user</p>;

	const tableHeader = [
		{ label: "title", willSort: true },
		{ label: "shortDescription", willSort: false },
		{ label: "published", willSort: true },
		{ label: "created At", willSort: true },
		{ label: "action", willSort: false },
	];
	const tableDataId = [
		"title",
		"shortDescription",
		"published",
		"createdAt",
	];

	return (
		<div className="max-w-screen-xl mx-auto p-4 mt-12 relative">
			<div className="relative">
				<GoBack />
				<Toast />

				<TableHeaderAction
					placeholder="Search for post title"
					authorId={posts.id}
					queryValue={query}
					tableName="post"
				/>

				<Suspense fallback={<Spinner />}>
					<Table
						name="post"
						datas={posts.posts}
						tableHeader={tableHeader}
						currentPage={currentPage}
						searchQuery={query}
						deleteAction={deletePost}
						tableDataId={tableDataId}
						renderCell={(data, field) => {
							if (field === "published") {
								return (
									<span className="">
										{data.published ? "published" : "not published"}
									</span>
								);
							}
							if (field === "createdAt") {
								return (
									<span className="">
										{format(new Date(data.createdAt), "dd/MM/yyyy")}
									</span>
								);
							}
							// Default rendering for other fields
							return data[field] || "N/A";
						}}
					/>
				</Suspense>

				<Pagination
					uri={posts.id} // uri: /post/cm66j0ikt0000pf1cp89q5her?page=1
					totalPages={totalPages}
					currentPage={currentPage}
				/>
			</div>
		</div>
	);
}
