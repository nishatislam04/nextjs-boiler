import ViewSvg from "@/svg/View";
import Button from "./Button";
import EditSvg from "@/svg/Edit";
import DeleteModal from "./DeleteModal";
import { deleteUser } from "@/actions/users/delete";

export default function TableAction({ uri, data }) {
	return (
		<td className="px-6 py-4 space-x-2">
			<Button
				href={`/${uri}/show?id=${data.id}`}
				padding="px-2 py-1">
				<ViewSvg />
				View
			</Button>
			<Button
				href={`/${uri}/edit?id=${data.id}`}
				padding="px-2 py-1"
				textColor="white"
				bgColor="yellow">
				<EditSvg />
				Edit
			</Button>
			{/* delete modal */}
			<DeleteModal
				uri="user"
				data={data}
				action={deleteUser}
				message="Are you sure you want to delete this user?"
			/>
		</td>
	);
}
