import Pagination from "@/components/Pagination";
import Search from "@/components/search";
import { Suspense } from "react";
import UserTable from "./UserTable";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import AddSvg from "@/svg/Add";
import prisma from "@/prisma/db";
import Toast from "@/components/Toast";

export default async function UserPage({ searchParams }) {
	const itemPerPage = 5;
	const params = await searchParams;
	const searchQuery = params?.query || "";
	const currentPage = params?.page || 1;
	const nameSort = params?.nameSort === "desc" ? "asc" : "desc";

	const totalUsers = await prisma.user.count();
	const totalPages = Math.ceil(totalUsers / itemPerPage);

	return (
		<div className="max-w-screen-xl mx-auto p-4 mt-12 relative">
			<Toast />
			<Button
				href="/user/create"
				padding="px-3 py-2"
				btnClasses="absolute top-0 right-0 text-sm font-medium">
				<AddSvg />
				Add User
			</Button>
			<div className="mb-6 w-1/2">
				<Search query={searchQuery} />
			</div>

			<div className="flex flex-wrap items-center justify-center mx-auto relative overflow-x-auto w-full border max-h-60">
				<Suspense fallback={<Spinner />}>
					<UserTable
						nameSort={nameSort}
						currentPage={currentPage}
						searchQuery={searchQuery}
					/>
				</Suspense>
			</div>

			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
			/>
		</div>
	);
}
