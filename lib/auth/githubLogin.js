"use server";
import { signIn } from "@/app/auth";

export async function githubLogin() {
	await signIn("github");
}
