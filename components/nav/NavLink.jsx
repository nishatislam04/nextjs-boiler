"use client";
import { NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlink({ link }) {
	const pathname = usePathname();

	const isActive =
		pathname === link.href ||
		(pathname.startsWith(link.href + "/") && link.href !== "/");

	const shouldAddQueryParams = ["users", "posts"];

	return (
		<li>
			<NavLink
				href={
					shouldAddQueryParams.includes(link["label"].toLowerCase())
						? `${link.href}?page=1`
						: link.href
				}
				component={Link}
				label={link.label}
				className={`${
					isActive
						? "font-bold text-blue-700 underline decoration-green-500 underline-offset-4"
						: "text-black dark:text-white"
				} block rounded px-1 py-2 md:bg-transparent md:p-0`}
				aria-current={isActive ? "page" : undefined}
			/>

			{/* <Link
				href={
					shouldAddQueryParams.includes(link["label"].toLowerCase())
						? `${link.href}?page=1`
						: link.href
				}
				className={`${
					isActive
						? "font-bold text-blue-700 underline decoration-green-500 underline-offset-4"
						: "text-black dark:text-white"
				} block rounded px-3 py-2 md:bg-transparent md:p-0`}
				aria-current={isActive ? "page" : undefined}>
				{link.label}
			</Link> */}
		</li>
	);
}
