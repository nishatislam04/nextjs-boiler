import Link from "next/link";
import NameSort from "./[id]/NameSort";
import ViewSvg from "@/svg/View";
import Button from "@/components/Button";
import EditSvg from "@/svg/Edit";
import DeleteModal from "@/components/DeleteModal";

async function fetchUsers(currentPage, itemPerPage, query, nameSort) {
	const users = await prisma.user.findMany({
		where: {
			name: {
				startsWith: `%${query}%`,
			},
		},
		orderBy: { name: nameSort },
		skip: (currentPage - 1) * itemPerPage,
		take: 5,
	});
	return users;
}

export default async function UserTable({
	nameSort,
	currentPage,
	searchQuery,
}) {
	let users = [];
	const itemPerPage = 5;

	users = await fetchUsers(
		currentPage,
		itemPerPage,
		searchQuery,
		nameSort
	);

	if (!users) return notFound();

	return (
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
						email
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
					<th
						scope="col"
						className="px-6 py-3">
						Actions
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
					users.map((user) => (
						<tr
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 mr-2"
							key={user.id}>
							<th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								{user.name}
							</th>
							<td className="px-6 py-4">{user.email}</td>
							<td className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-6 py-3">
								<Link href={`/user/${user.id}`}>profile</Link>
							</td>
							<td className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-6 py-3">
								<Link href={`/post/${user.id}`}>posts</Link>
							</td>
							<td className="px-6 py-4 space-x-2">
								<Button
									href={`/user/show?id=${user.id}`}
									padding="px-2 py-1">
									<ViewSvg />
									View
								</Button>
								<Button
									href={`/user/edit?id=${user.id}`}
									padding="px-2 py-1"
									textColor="white"
									bgColor="yellow">
									<EditSvg />
									Edit
								</Button>
								{/* delete modal */}

								<DeleteModal user={user} />
							</td>
						</tr>
					))
				)}
			</tbody>
		</table>
	);
}
