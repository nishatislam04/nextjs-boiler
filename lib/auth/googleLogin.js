"use server";
import { signIn } from "@/app/auth";

export async function googleLogin() {
	await signIn("google");
}
