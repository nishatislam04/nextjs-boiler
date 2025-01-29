"use client";
import Toast from "@/components/ui/Toast";
import { updateUser } from "@/lib/repository/actions/users/update";
import { updateUserSchema } from "@/lib/schema/user/update";
import {
	Box,
	Button,
	LoadingOverlay,
	Textarea,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserForm({ user, authorId }) {
	const [serverErrors, setServerErrors] = useState({});
	const [visible, { toggle }] = useDisclosure(false);

	const router = useRouter();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: user.name,
			email: user.email,
			username: user.username,
			bio: user.profile?.bio,
			website: user.profile?.website,
			location: user.profile?.location,
		},
		validate: zodResolver(updateUserSchema),
	});

	const handleSubmit = async (values) => {
		toggle();
		setServerErrors({});

		const response = await updateUser(authorId, values);

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
						placeholder="user name"
						defaultValue={user.name}
						key={form.key("name")}
						{...form.getInputProps("name")}
						error={form.errors.name || serverErrors.name}
					/>
					<TextInput
						className="mb-4 w-1/2"
						label="Email Address"
						size="xs"
						name="email"
						placeholder="user email"
						defaultValue={user.email}
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
						placeholder="username"
						defaultValue={user.username}
						key={form.key("username")}
						{...form.getInputProps("username")}
						error={form.errors.username || serverErrors.username}
					/>
					<TextInput
						className="mb-4 w-1/2"
						label="Website Link"
						size="xs"
						name="website"
						placeholder="website"
						defaultValue={user.profile?.website || ""}
						key={form.key("website")}
						{...form.getInputProps("website")}
						error={form.errors.website || serverErrors.website}
					/>
				</div>
				<Textarea
					className="w-full"
					label="Bio"
					placeholder="User Bio"
					autosize
					minRows={2}
					maxRows={4}
					name="bio"
					defaultValue={user.profile?.bio || ""}
					key={form.key("bio")}
					{...form.getInputProps("bio")}
					error={form.errors.bio || serverErrors.bio}
				/>
				<div className="flex w-full gap-4">
					<TextInput
						className="mb-4 w-1/2"
						label="User Location"
						size="xs"
						name="location"
						placeholder="user location"
						defaultValue={user.profile?.location}
						key={form.key("location")}
						{...form.getInputProps("location")}
						error={form.errors.location || serverErrors.location}
					/>
				</div>
				<Button
					loading={visible}
					color="orange"
					variant="filled"
					size="xs"
					radius="md"
					type="submit">
					Update
				</Button>
			</form>
		</Box>
	);
}
