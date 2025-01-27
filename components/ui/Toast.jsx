"use client";

import { flashMessage } from "@thewebartisan7/next-flash-message";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

export default function Toast() {
	useEffect(() => {
		const showFlashMessage = async () => {
			const flash = await flashMessage();

			if (flash && flash.level === "success") {
				notifications.show({
					title: "success",
					message: flash.message,
					position: "top-right",
					color: "indigo",
					radius: "md",
				});
			} else if (flash && flash.level === "error") {
				notifications.show({
					title: "Error",
					message: flash.message,
					position: "top-right",
					color: "red",
					radius: "md",
				});
			}
		};

		showFlashMessage();
	}, []);
	return <div className=""></div>;
}
