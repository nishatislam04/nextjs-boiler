import { signOut } from "@/app/auth";
import SignoutSvg from "@/components/svg/Signout";
import { Button } from "@mantine/core";

export function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}>
			<Button
				rightSection={<SignoutSvg />}
				type="submit"
				variant="light"
				color="red">
				Sign out
			</Button>
		</form>
	);
}
