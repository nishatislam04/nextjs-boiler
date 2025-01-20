import Pagination from "@/components/Pagination";
import Search from "@/components/search";
import { Suspense } from "react";
import UserTable from "./UserTable";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import AddSvg from "@/svg/Add";
import prisma from "@/prisma/db";
import Toast from "@/components/Toast";
import TableHeaderAction from "@/components/TableHeaderAction";

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

			<TableHeaderAction
				queryValue={searchQuery}
				tableName="User"
			/>

			<div className="flex flex-wrap items-center justify-center mx-auto relative overflow-x-auto w-full border max-h-72">
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
