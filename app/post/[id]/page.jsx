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

async function fetchPosts(id) {
	return await prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			posts: true,
		},
	});
}

export default async function PostPage({ params }) {
	const id = (await params).id;
	if (!id) return notFound();

	const user = await fetchPosts(id);
	const posts = user.posts;

	if (!posts) return <p>no posts found for this user</p>;

	const tableHeader = ["id", "title", "published", "created at", "action"];

	return (
		<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<TableHeaderAction
				queryValue="post"
				tableName="post"
			/>

			<div className="w-full relative overflow-x-auto  sm:rounded-lg">
				<table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 mb-5 border-b-2  dark:border-gray-700">
						<TableHeader header={tableHeader} />
					</thead>
					<tbody>
						{posts.map((post) => (
							<tr
								key={post.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<td className="w-4 p-4">
									<TableCheckbox />
								</td>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{post.id}
								</th>
								<td className="px-6 py-4">{post.title}</td>
								<td className="px-6 py-4">
									{post.published ? "published" : "not published"}
								</td>
								<td className="px-6 py-4">12-02-2025</td>
								<TableAction
									uri="post"
									data={post}
								/>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination
					totalPages={5}
					currentPage={1}
				/>
			</div>
		</div>
	);
}
