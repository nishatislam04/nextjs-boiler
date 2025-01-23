"use client";
import CloseSvg from "@/svg/Close";
import Button from "./Button";
import DeleteSvg from "@/svg/Delete";
import { useState } from "react";

export default function DeleteModal({
	deleteAction,
	uri,
	data,
	message = "Are you sure you want to delete this item?",
}) {
	const [show, setShow] = useState(false);

	function handleShow() {
		setShow((prevState) => !prevState);
	}

	return (
		<>
			<Button
				onClick={handleShow}
				type="modal"
				href={`/${uri}/delete?id=${data.id}`}
				padding="px-2 py-1"
				textColor="white"
				bgColor="red">
				<DeleteSvg />
				Delete
			</Button>
			{show && (
				<div
					onClick={handleShow}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 "
					aria-labelledby="modal-title"
					role="dialog"
					aria-modal="true">
					<div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800">
						{/* Close button */}
						<button
							onClick={handleShow}
							className="w-8 h-8 absolute p-2 top-3 right-3 hover:bg-gray-200 hover:rounded-md text-gray-400 hover:text-gray-900 dark:hover:text-white"
							aria-label="Close modal">
							<CloseSvg />
						</button>

						{/* Modal content */}
						<div className="p-6 text-center">
							<svg
								className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
								aria-hidden="true"
								fill="none"
								viewBox="0 0 20 20">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<h3 className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">
								{message}
							</h3>
							<div className="flex items-center justify-center">
								<form
									action={deleteAction.bind(null, data.id)}
									className="flex items-center">
									<button
										type="submit"
										className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mr-2">
										Yes, I&apos;m sure
									</button>
								</form>

								<button
									onClick={handleShow}
									className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
									No, cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
