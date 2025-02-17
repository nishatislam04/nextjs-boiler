"use client";

import SignoutSvg from "@/components/svg/Signout";
import { signout } from "@/lib/auth/signout";
import { Button } from "@mantine/core";
import { useRef } from "react";

export function SignOut() {
	const formRef = useRef(null);

	const handleSignOut = () => {
		// ✅ Clear localStorage before signing out
		localStorage.removeItem("authUserData");

		// ✅ Submit the form programmatically
		formRef.current?.requestSubmit();
	};

	return (
		<form
			ref={formRef}
			action={signout}>
			<Button
				rightSection={<SignoutSvg />}
				type="button" // ✅ Change from "submit" to "button"
				variant="light"
				color="red"
				radius="lg"
				onClick={handleSignOut} // ✅ Call the signout handler
			>
				Sign out
			</Button>
		</form>
	);
}
