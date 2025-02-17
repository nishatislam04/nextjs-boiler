"use server";

import { signOut } from "@/app/auth";
import sessionHelper from "../sessionHelper";

export async function signout() {
	sessionHelper.clearSessionCache();
	await signOut();
}
