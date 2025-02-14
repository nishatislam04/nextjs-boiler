import GoBack from "@/components/ui/GoBack";
import EditUserForm from "./Form";
import { fetchUser } from "@/lib/repository/user/dal";
import { fetchAllRoles } from "@/lib/repository/roles/dal";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";

export default async function UserEditPage({ searchParams }) {
	const authUser = await checkAuthAndRoles("/dashboard/user/edit");
	if (React.isValidElement(authUser)) return authUser;

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
				<div className="mt-12 mb-8 absolute -top-24 right-2">
					<GoBack />
				</div>{" "}
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
