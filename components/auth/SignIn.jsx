"use client";
import GithubSvg from "@/components/svg/github";
import { Button, Menu } from "@mantine/core";
import GoogleSvg from "../svg/google";
import { googleLogin } from "@/lib/auth/googleLogin";
import { githubLogin } from "@/lib/auth/githubLogin";

export default function SignIn() {
	return (
		<Menu
			width={200}
			className="">
			<Menu.Target>
				<Button
					variant="light"
					color="gray"
					radius="lg">
					Login
				</Button>
			</Menu.Target>

			<Menu.Dropdown className="">
				<Menu.Item
					className=""
					leftSection={<GithubSvg />}
					onClick={githubLogin}
					variant="filled">
					Sign in with GitHub
				</Menu.Item>

				<Menu.Item
					className=""
					leftSection={<GoogleSvg />}
					onClick={googleLogin}
					variant="light">
					Sign in with Google
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
