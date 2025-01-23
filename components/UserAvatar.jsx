import { auth } from "@/app/auth";
import Image from "next/image";

export default async function UserAvatar() {
	const session = await auth();

	if (!session?.user) return null;

	return (
		<div>
			<Image
				height={30}
				width={30}
				src={session.user.image}
				alt="User Avatar"
			/>
		</div>
	);
}
