"use client";

import { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Button = memo(
	({
		type = "button",
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

		// focus:ring-4 focus:outline-none
		const baseClasses =
			"text-sm font-medium inline-flex items-center rounded-lg mr-1";
		// const backBtn = isBackButton ? "500" : "700";
		const backgroundColor = `bg-${bgColor}-700 hover:bg-${bgColor}-700`;
		const focusRing = `focus:ring-${bgColor}-700 dark:focus:ring-${bgColor}-700`;
		const darkBackground = `dark:bg-${bgColor}-700 dark:hover:bg-${bgColor}-700`;

		// LINK button
		if (type === "link") {
			return (
				<Link
					className={`${baseClasses} text-${textColor} hover:underline decoration-blue-600 decoration-1 underline-offset-4 focus:ring-0 ${btnClasses}`}
					href={href}>
					{children}
				</Link>
			);
		}

		// actual button
		if (type === "button") {
			return (
				<button
					type="button"
					className={`${baseClasses} ${padding} text-${textColor} ${backgroundColor} ${darkBackground} ${focusRing} ${btnClasses}`}
					onClick={() => router.push(href)}>
					{children}
				</button>
			);
		}

		// go-back button
		// if (type === "button" && isBackButton) {
		// 	console.log("invoke back button");
		// 	return (
		// 		<button
		// 			type="button"
		// 			className={`${baseClasses} ${padding} text-${textColor} ${backgroundColor} ${darkBackground} ${focusRing} ${btnClasses}`}
		// 			onClick={() => router.back()}>
		// 			{children}
		// 		</button>
		// 	);
		// }

		if (type === "submit") {
			return (
				<button
					type="submit"
					className={`${baseClasses} ${padding} text-${textColor} ${backgroundColor} ${darkBackground} ${focusRing} ${btnClasses}`}>
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
