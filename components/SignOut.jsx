import { signOut } from "@/app/auth";
import SignoutSvg from "@/svg/Signout";

export function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}>
			<button
				type="submit"
				className="flex justify-center items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
				signout
				<SignoutSvg />
			</button>
		</form>
	);
}
