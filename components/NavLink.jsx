"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ link }) {
	const pathname = usePathname();

	return (
		<li>
			<Link
				href={link.href}
				className={`${
					pathname === link.href && "text-blue-700 font-bold underline decoration-green-500 underline-offset-4"
				} block py-2 px-3 rounded md:bg-transparent md:p-0 dark:text-white text-black`}
				aria-current="page">
				{link.label}
			</Link>
		</li>
	);
}
