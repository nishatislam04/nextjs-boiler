import { signIn } from "@/app/auth";
import GithubSvg from "@/svg/github";

export default function SignIn() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("github");
			}}>
			<button
				type="submit"
				className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
				<GithubSvg />
				signin
			</button>
		</form>
	);
}
