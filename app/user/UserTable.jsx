import Link from "next/link";

export default function UserTable({ users }) {
	return users.map((user) => (
		<tr
			className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 mr-2"
			key={user.id}>
			<th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
			<td className="px-6 py-4">{user.email}</td>
			<td className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-6 py-3">
				<Link href={`/user/${user.id}`}>profile</Link>
			</td>
			<td className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-6 py-3">
				<Link href={`/post/${user.id}`}>posts</Link>
			</td>
		</tr>
	));
}
