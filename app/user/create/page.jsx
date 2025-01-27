import GoBack from "@/components/ui/GoBack";
import CreateUserForm from "./Form";

export default function UserCreatePage() {
	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">
			<div className="relative">
				<GoBack />

				<h1 className="mb-5 text-2xl font-bold">Create User</h1>

				<CreateUserForm />
			</div>
		</div>
	);
}
