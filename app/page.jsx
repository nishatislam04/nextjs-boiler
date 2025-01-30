import Logger from "@/lib/logger";
import { auth } from "./auth";

export default async function Home() {
	const session = await auth();
	// console.log("user", session);
	Logger.info(session, "--test--");
	return (
		<div className="relative mx-auto mt-12 max-w-screen-xl p-4">home</div>
	);
}
