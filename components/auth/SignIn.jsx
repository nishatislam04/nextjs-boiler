import { signIn } from "@/app/auth";
import GithubSvg from "@/prisma/svg/github";
import { Button } from "@mantine/core";

export default function SignIn() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("github");
			}}>
			<Button
				leftSection={<GithubSvg />}
				type="submit"
				variant="light">
				Sign in
			</Button>
		</form>
	);
}
