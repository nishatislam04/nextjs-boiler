"use client";
import GithubSvg from "@/components/svg/github";
import GoogleSvg from "../svg/google";
import {
	Anchor,
	Button,
	Divider,
	Group,
	LoadingOverlay,
	Modal,
	Paper,
	PasswordInput,
	Stack,
	TextInput,
} from "@mantine/core";
import { googleLogin } from "@/lib/auth/googleLogin";
import { githubLogin } from "@/lib/auth/githubLogin";
import { upperFirst, useDisclosure, useToggle } from "@mantine/hooks";
import { useForm, zodResolver } from "@mantine/form";
import { signInAction } from "@/lib/auth/signIn";
import Logger from "@/lib/logger";
import { signInSchema } from "@/lib/schema/auth/signIn";
import { signUpSchema } from "@/lib/schema/auth/SignUp";
import { signUp } from "@/lib/auth/signUp";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
	const [loading, setLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [type, toggle] = useToggle(["login", "register"]);
	const [serverErrors, setServerErrors] = useState({});
	const router = useRouter();
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
			username: "",
			login_email_username: "",
		},
		validate: zodResolver(
			type === "register" ? signUpSchema : signInSchema
		),
	});

	const handleSubmit = async (values) => {
		setServerErrors({});
		setLoading(true);

		try {
			if (type === "login") {
				const payload = {
					login_email_username: values.login_email_username,
					password: values.password,
				};

				const response = await signInAction(payload);

				if (!response.success) {
					setLoading(false);
					setServerErrors(response.errors);
					form.setValues({ password: "" });
				} else {
					setLoading(false);
					close();
					router.refresh();
				}
			} else {
				// register (signup)
				const { username, email, password } = values;
				const payload = { username, email, password };

				const response = await signUp(payload); // Replace with actual API call
				Logger.info(response, "server response for sign-up");

				if (!response.success) {
					setLoading(false);
					setServerErrors(response.errors);
					form.setValues({ password: "" });
				} else {
					setLoading(false);
					close();
					router.refresh();
				}
			}
		} catch (error) {
			console.error("Auth Error:", error);
			setServerErrors({
				general: "Something went wrong, please try again.",
			});
		}
	};

	return (
		<>
			<Button
				variant="light"
				color="gray"
				size="sm"
				radius="lg"
				onClick={open}>
				Login
			</Button>
			<Modal
				opened={opened}
				onClose={close}
				title={`Welcome to Go-Crazy, ${type} with`}>
				<Paper
					radius="md"
					className="px-8 py-4 relative">
					{/* 🔹 Loading Overlay inside Paper to cover form properly */}
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{ radius: "sm", blur: 2 }}
					/>

					<Group grow>
						<Button
							variant="light"
							color="gray"
							leftSection={<GoogleSvg />}
							onClick={googleLogin}>
							Google
						</Button>
						<Button
							color="gray"
							variant="light"
							leftSection={<GithubSvg />}
							onClick={githubLogin}>
							Github
						</Button>
					</Group>

					<Divider
						label="Or continue with email"
						labelPosition="center"
						my="lg"
					/>

					{/* Form */}
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<Stack>
							{type === "register" && (
								<TextInput
									label="Username"
									placeholder="Your username"
									value={form.values.username}
									onChange={(event) =>
										form.setFieldValue(
											"username",
											event.currentTarget.value
										)
									}
									error={form.errors.username || serverErrors.username}
									size="xs"
									radius="sm"
								/>
							)}

							{type === "register" && (
								<TextInput
									label="Email"
									placeholder="hello@mantine.dev"
									value={form.values.email}
									onChange={(event) =>
										form.setFieldValue("email", event.currentTarget.value)
									}
									error={form.errors.email || serverErrors.email}
									size="xs"
									radius="sm"
								/>
							)}

							{type === "login" && (
								<TextInput
									label="Email or Username"
									placeholder="email or username"
									size="xs"
									radius="sm"
									name="login_email_username"
									key={form.key("login_email_username")}
									{...form.getInputProps("login_email_username")}
									error={
										form.errors.login_email_username ||
										serverErrors.login_email_username
									}
								/>
							)}

							<PasswordInput
								label="Password"
								placeholder="Your password"
								size="xs"
								radius="sm"
								name="password"
								key={form.key("password")}
								{...form.getInputProps("password")}
								error={form.errors.password || serverErrors.password}
							/>
						</Stack>

						<Group
							justify="space-between"
							mt="xl">
							<Anchor
								component="button"
								type="button"
								c="dimmed"
								onClick={() => {
									form.setErrors({});
									form.setValues({ password: "" });
									toggle();
								}}
								size="xs">
								{type === "register"
									? "Already have an account? Login"
									: "Don't have an account? Register"}
							</Anchor>
							<Button
								color="cyan"
								type="submit">
								{upperFirst(type)}
							</Button>
						</Group>
					</form>
				</Paper>
			</Modal>
		</>
	);
}
