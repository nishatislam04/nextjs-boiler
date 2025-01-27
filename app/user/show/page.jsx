import GoBack from "@/components/GoBack";
import UserShowForm from "./Form";
import { fetchUser } from "@/repository/user/dal";

export default async function UserShowPage({ searchParams }) {
	const params = await searchParams;
	const id = params.id || "";
	const user = await fetchUser(id);

	console.log("show-user", user);

	return (
		<div className="mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<GoBack />

				<h1 className="mb-5 text-2xl font-bold">Show User</h1>

				<UserShowForm user={user} />
			</div>
		</div>
	);
}
