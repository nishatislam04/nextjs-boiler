import GoBack from "@/components/ui/GoBack";
import CreateUserForm from "./Form";
import { fetchAllRoles } from "@/lib/repository/roles/dal";
import Logger from "@/lib/logger";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";

export default async function UserCreatePage() {
	const authUser = await checkAuthAndRoles("/dashboard/user/create");
	if (React.isValidElement(authUser)) return authUser;

	let roles = await fetchAllRoles();
	roles = roles.map((role) => {
		return { value: String(role.id), label: role.name };
	});
	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<div className="mt-12 mb-8 absolute -top-24 right-2">
					<GoBack />
				</div>

				<h1 className="mb-5 text-2xl font-bold">Create User</h1>

				<CreateUserForm roles={roles} />
			</div>
		</div>
	);
}
