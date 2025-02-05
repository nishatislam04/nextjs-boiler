import SignoutSvg from "@/components/svg/Signout";
import { signout } from "@/lib/auth/signout";
import { Button } from "@mantine/core";

export function SignOut() {
	return (
		<form action={signout}>
			<Button
				rightSection={<SignoutSvg />}
				type="submit"
				variant="light"
				color="red"
				radius="lg">
				Sign out
			</Button>
		</form>
	);
}
