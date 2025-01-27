"use client";
import { createUser } from "@/lib/repository/actions/users/create";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLock } from "@tabler/icons-react";

export default function CreateUserForm() {
	const [visible, { toggle }] = useDisclosure(false);
	const passwordIcon = (
		<IconLock
			size={18}
			stroke={1.5}
		/>
	);
	return (
		<form
			action={createUser}
			className="rounded-lg bg-gray-100 px-3 py-6">
			<div className="flex w-full gap-4">
				<TextInput
					className="mb-4 w-1/2"
					label="Name"
					size="xs"
					name="name"
					placeholder="Name"
				/>
				<TextInput
					className="mb-4 w-1/2"
					label="Email Address"
					size="xs"
					name="email"
					placeholder="Email Address"
				/>
			</div>
			<div className="flex w-full gap-4">
				<TextInput
					className="mb-4 w-1/2"
					label="Userame"
					size="xs"
					name="username"
					placeholder="Username"
				/>
				<PasswordInput
					className="mb-4 w-1/2"
					leftSection={passwordIcon}
					label="password"
					placeholder="Password"
					visible={visible}
					onVisibilityChange={toggle}
					name="password"
				/>
			</div>

			<Button
				variant="filled"
				size="xs"
				radius="md"
				type="submit">
				Create
			</Button>
		</form>
	);
}
