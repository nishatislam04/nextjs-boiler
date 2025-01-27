import GoBack from "@/components/ui/GoBack";
import EditUserForm from "./Form";
import { fetchUser } from "@/lib/repository/user/dal";

export default async function UserEditPage({ searchParams }) {
	const params = await searchParams;
	const id = params.id || "";
	const user = await fetchUser(id);

	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<GoBack />
				<h1 className="mb-5 text-2xl font-bold">Edit User</h1>

				<EditUserForm
					user={user}
					authorId={id}
				/>
			</div>
		</div>
	);
}
