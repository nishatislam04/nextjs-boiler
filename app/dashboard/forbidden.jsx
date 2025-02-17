import { Button } from "@mantine/core";
import Link from "next/link";

export default function Forbidden() {
	return (
		<main className="flex justify-stretch items-center max-w-screen-xl  min-h-[calc(100vh-var(--nav-height))] bg-gray-50">
			<section className="w-full mx-auto min-h-[calc(60vh-var(--nav-height))] flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-lg">
				<h1 className="font-light uppercase text-gray-500 text-5xl">
					403 - Forbidden
				</h1>
				<p className="font-light uppercase text-gray-400 text-xl">
					You are not authorized to access this resource.
				</p>
				<Link
					href="/"
					className="mt-2">
					<Button
						variant="light"
						color="gray"
						size="xs">
						Return Home
					</Button>
				</Link>
			</section>
		</main>
	);
}
