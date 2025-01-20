"use client";

import { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// eslint-disable-next-line react/display-name
const Button = memo(
	({
		type = "link",
		href = "#",
		btnClasses = "",
		padding = "px-4 py-2",
		textColor = "white",
		bgColor = "blue",
		onClick = () => {},
		children,
		...rest
	}) => {
		const router = useRouter();
		const baseClasses =
			"text-sm font-medium inline-flex items-center rounded-lg focus:ring-4 focus:outline-none mr-1";

		const backgroundColor = `bg-${bgColor}-700 hover:bg-${bgColor}-800`;
		const focusRing = `focus:ring-${bgColor}-300 dark:focus:ring-${bgColor}-800`;
		const darkBackground = `dark:bg-${bgColor}-600 dark:hover:bg-${bgColor}-700`;

		// LINK button
		if (type === "link") {
			return (
				<Link
					className={`${baseClasses} ${padding} text-${textColor} ${backgroundColor} ${darkBackground} ${focusRing} ${btnClasses}`}
					href={href}>
					{children}
				</Link>
			);
		}

		// actual button
		if (type === "button") {
			return (
				<button
					className={`${baseClasses} ${padding} text-${textColor} ${backgroundColor} ${darkBackground} ${focusRing} ${btnClasses}`}
					onClick={router.back}>
					{children}
				</button>
			);
		}

		// modal Button
		if (type === "modal") {
			return (
				<button
					onClick={onClick}
					className={`${baseClasses} ${padding} text-${textColor} ${backgroundColor} ${darkBackground} ${focusRing} ${btnClasses}`}
					{...rest}>
					{children}
				</button>
			);
		}
	},
	(prevProps, nextProps) => {
		// Custom comparison to prevent unnecessary re-renders
		return (
			prevProps.type === nextProps.type &&
			prevProps.href === nextProps.href &&
			prevProps.btnClasses === nextProps.btnClasses &&
			prevProps.padding === nextProps.padding &&
			prevProps.textColor === nextProps.textColor &&
			prevProps.bgColor === nextProps.bgColor &&
			prevProps.children === nextProps.children
		);
	}
);

export default Button;
