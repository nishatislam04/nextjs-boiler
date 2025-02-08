import GoBack from "@/components/ui/GoBack";
import CreateUserForm from "./Form";
import { fetchAllRoles } from "@/lib/repository/roles/dal";
import Logger from "@/lib/logger";

export default async function UserCreatePage() {
	let roles = await fetchAllRoles();
	roles = roles.map((role) => {
		return { value: String(role.id), label: role.name };
	});
	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<GoBack />

				<h1 className="mb-5 text-2xl font-bold">Create User</h1>

				<CreateUserForm roles={roles} />
			</div>
		</div>
	);
}
