"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ link }) {
	const pathname = usePathname();

	const isActive =
		pathname === link.href ||
		(pathname.startsWith(link.href + "/") && link.href !== "/");

	return (
		<li>
			<Link
				href={link.href}
				className={`${
					isActive
						? "text-blue-700 font-bold underline decoration-green-500 underline-offset-4"
						: "text-black dark:text-white"
				} block py-2 px-3 rounded md:bg-transparent md:p-0`}
				aria-current={isActive ? "page" : undefined}>
				{link.label}
			</Link>
		</li>
	);
}
