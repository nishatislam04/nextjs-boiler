"use client";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { createUser } from "@/lib/repository/actions/users/create";
import {
	Box,
	Button,
	LoadingOverlay,
	PasswordInput,
	TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLock } from "@tabler/icons-react";
import { createUserSchema } from "@/lib/schema/user/create";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";
import { notifications } from "@mantine/notifications";

export default function CreateUserForm() {
	const [serverErrors, setServerErrors] = useState({});
	const [visible, { toggle }] = useDisclosure(false);
	const passwordIcon = (
		<IconLock
			size={18}
			stroke={1.5}
		/>
	);
	const router = useRouter();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
			username: "",
			password: "",
		},
		validate: zodResolver(createUserSchema),
	});

	const handleSubmit = async (values) => {
		toggle();
		setServerErrors({});

		const response = await createUser(values);

		if (!response.success) {
			setServerErrors(response.errors);
			toggle();
			return;
		} else {
			toggle();
			router.push("/user");
		}
	};

	useEffect(() => {
		if (serverErrors.general) {
			notifications.show({
				title: "Error",
				message: serverErrors.general,
				position: "top-right",
				color: "red",
				radius: "md",
				autoClose: 5000,
			});
			setServerErrors({});
			toggle();
		}
	}, [serverErrors, toggle]);

	return (
		<Box pos="relative">
			<LoadingOverlay
				visible={visible}
				zIndex={10000}
				overlayProps={{ radius: "sm", blur: 2 }}
			/>
			<form
				onSubmit={form.onSubmit(handleSubmit)}
				className="rounded-lg bg-gray-100 px-3 py-6">
				<Toast />
				<div className="flex w-full gap-4">
					<TextInput
						className="mb-4 w-1/2"
						label="Name"
						size="xs"
						name="name"
						placeholder="Name"
						key={form.key("name")}
						{...form.getInputProps("name")}
						error={form.errors.name || serverErrors.name}
					/>
					<TextInput
						className="mb-4 w-1/2"
						label="Email Address"
						size="xs"
						name="email"
						placeholder="Email Address"
						key={form.key("email")}
						{...form.getInputProps("email")}
						error={form.errors.email || serverErrors.email}
					/>
				</div>
				<div className="flex w-full gap-4">
					<TextInput
						className="mb-4 w-1/2"
						label="Userame"
						size="xs"
						name="username"
						placeholder="Username"
						key={form.key("username")}
						{...form.getInputProps("username")}
						error={form.errors.username || serverErrors.username}
					/>
					<PasswordInput
						className="mb-4 w-1/2"
						leftSection={passwordIcon}
						label="password"
						placeholder="Password"
						visible={visible}
						onVisibilityChange={toggle}
						name="password"
						key={form.key("password")}
						{...form.getInputProps("password")}
						error={form.errors.password || serverErrors.password}
					/>
				</div>

				<Button
					loading={visible}
					variant="filled"
					size="xs"
					radius="md"
					type="submit">
					Create
				</Button>
			</form>
		</Box>
	);
}
