import GoBack from "@/components/ui/GoBack";
import EditUserForm from "./Form";
import { fetchUser } from "@/lib/repository/user/dal";
import { fetchAllRoles } from "@/lib/repository/roles/dal";

export default async function UserEditPage({ searchParams }) {
	const params = await searchParams;
	const id = params.id || "";
	const user = await fetchUser(id);

	let roles = await fetchAllRoles();
	roles = roles.map((role) => {
		return { value: String(role.id), label: role.name };
	});

	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<GoBack />
				<h1 className="mb-5 text-2xl font-bold">Edit User</h1>

				<EditUserForm
					user={user}
					authorId={id}
					roles={roles}
				/>
			</div>
		</div>
	);
}
