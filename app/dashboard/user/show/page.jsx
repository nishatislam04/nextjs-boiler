import GoBack from "@/components/ui/GoBack";
import UserShowForm from "./Form";
import { fetchUser } from "@/lib/repository/user/dal";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";

export default async function UserShowPage({ searchParams }) {
	const authUser = await checkAuthAndRoles("/dashboard/user/show");
	if (React.isValidElement(authUser)) return authUser;

	const params = await searchParams;
	const id = params.id || "";
	const user = await fetchUser(id);

	console.log("show-user", user);

	return (
		<div className="mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<div className="mt-12 mb-8 absolute -top-24 right-2">
					<GoBack />
				</div>

				<h1 className="mb-5 text-2xl font-bold">Show User</h1>

				<UserShowForm user={user} />
			</div>
		</div>
	);
}
