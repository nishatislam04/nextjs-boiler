import EditSvg from "@/components/svg/Edit";
import ViewSvg from "@/components/svg/View";
import AuthorizedView from "@/components/ui/auth/AuthorizedView";
import DeleteModal from "@/components/ui/DeleteModal";
import { deleteUser } from "@/lib/repository/actions/users/delete";
import { Button } from "@mantine/core";
import Link from "next/link";

/**
 * table view edit & delete btns
 * @returns
 */
export default function UserTableActions({ user }) {
	return (
		<div style={{ display: "flex", gap: "8px" }}>
			<Link href={`/dashboard/user/show?id=${user.id}`}>
				<Button
					size="compact-xs"
					color="indigo">
					<ViewSvg />
					View
				</Button>
			</Link>
			<AuthorizedView pathname="/dashboard/user/edit">
				<Link href={`/dashboard/user/edit?id=${user.id}`}>
					<Button
						size="compact-xs"
						color="orange">
						<EditSvg />
						Edit
					</Button>
				</Link>
			</AuthorizedView>
			<AuthorizedView pathname="/dashboard/user/delete">
				<DeleteModal
					id={user.id}
					deleteAction={deleteUser}
					title="Delete User"
					message={`Are you sure you want to delete this User?`}
				/>
			</AuthorizedView>
		</div>
	);
}
