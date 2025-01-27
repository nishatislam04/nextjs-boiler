"use client";
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import DeleteSvg from "@/components/svg/Delete";
import { notifications } from "@mantine/notifications";

export default function DeleteModal({ id, deleteAction, title, message }) {
	const openDeleteModal = () =>
		modals.openConfirmModal({
			title,
			centered: true,
			children: <Text size="sm">{message}</Text>,
			labels: { confirm: "Yes, Proceed", cancel: "No, Cancel" },
			confirmProps: { color: "red" },
			overlayProps: {
				backgroundOpacity: 0.55,
				blur: 3,
			},
			onCancel: () =>
				notifications.show({
					withBorder: true,
					position: "top-right",
					autoClose: 5000,
					title: "Action canceled",
					message: "Resource was not deleted 🌟",
				}),
			onConfirm: async () => {
				try {
					const response = await deleteAction(id);

					if (response.status === "success") {
						notifications.show({
							withBorder: true,
							position: "top-right",
							autoClose: 5000,
							title: "Success",
							message: response.message || "Resource has been deleted 🌟",
						});
					} else {
						notifications.show({
							withBorder: true,
							color: "red",
							position: "top-right",
							autoClose: 5000,
							title: "Error",
							message:
								response.message ||
								"Failed to delete the resource. Please try again.",
						});
					}
				} catch (error) {
					notifications.show({
						withBorder: true,
						color: "red",
						position: "top-right",
						autoClose: 5000,
						title: "Error",
						message: "Something went wrong. Please try again.",
					});
				}
			},
		});

	return (
		<Button
			color="red"
			size="compact-xs"
			onClick={openDeleteModal}>
			<DeleteSvg />
			Delete
		</Button>
	);
}
