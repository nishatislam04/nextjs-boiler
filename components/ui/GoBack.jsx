"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";

export default function GoBack() {
	// todo: make sure, this component only render in 2nd page.
	// even if it was invoke in first page
	const pathname = usePathname();
	const route = pathname.split("/");
	const router = useRouter();

	const back = <IconChevronLeft />;

	if (route.length > 1)
		return (
			// <div className="absolute -top-16 right-2">
			<div className="">
				<Button
					leftSection={back}
					onClick={() => router.back()}
					variant="light"
					color="gray"
					size="xs"
					radius="xs">
					back
				</Button>
			</div>
		);
}
