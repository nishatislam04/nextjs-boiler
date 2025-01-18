import Pagination from "@/components/Pagination";
import Search from "@/components/search";
import prisma from "@/prisma/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import NameSort from "./[id]/NameSort";
import EmailSort from "./[id]/EmailSort";
import { Suspense } from "react";
import UserTable from "./UserTable";
import Spinner from "@/components/Spinner";

async function fetchUsers(currentPage, itemPerPage, query, nameSort, emailSort) {
	const [users, totalUsers] = await Promise.all([
		prisma.user.findMany({
			where: {
				name: {
					startsWith: `%${query}%`,
				},
			},
			orderBy: [{ name: nameSort }, { email: emailSort }],
			skip: (currentPage - 1) * itemPerPage,
			take: 5,
		}),
		prisma.user.count(),
	]);
	return [users, totalUsers];
}

export default async function UserPage({ searchParams }) {
	let users = [];
	let totalUsers = 0;
	let totalPages = 0;
	const itemPerPage = 5;
	const currentPage = parseInt(searchParams?.page || "1", 10);
	const searchQuery = (await searchParams?.query) || "";
	const nameSort = (await searchParams?.nameSort) || "desc";
	const emailSort = (await searchParams?.emailSort) || "desc";

	[users, totalUsers] = await fetchUsers(currentPage, itemPerPage, searchQuery, nameSort, emailSort);
	totalPages = Math.ceil(totalUsers / itemPerPage);

	if (!users) notFound();

	return (
		<div className="max-w-screen-xl mx-auto  p-4 mt-12">
			<div className="mb-6 w-1/2">
				<Search query={searchQuery} />
			</div>

			<div className="flex flex-wrap items-center justify-center mx-auto relative overflow-x-auto w-full border max-h-60">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 ">
								<NameSort />
							</th>
							<th
								scope="col"
								className="px-6 py-3 ">
								<EmailSort />
							</th>
							<th
								scope="col"
								className="px-6 py-3">
								Profile
							</th>
							<th
								scope="col"
								className="px-6 py-3">
								Posts
							</th>
						</tr>
					</thead>
					<tbody>
						{users.length === 0 ? (
							<tr className="">
								<th
									className="text-gray-400 italic text-center py-5 text-4xl"
									colSpan={4}>
									No user found
								</th>
							</tr>
						) : (
							<Suspense fallback={<Spinner />}>
								<UserTable users={users} />
							</Suspense>
						)}
					</tbody>
				</table>
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	);
}
