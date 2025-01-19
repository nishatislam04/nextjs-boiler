import CloseSvg from "@/svg/Close";
import SuccessSvg from "@/svg/success";

export default function Toast() {
	return (
		<div className="w-full">
			<div
				id="toast-success"
				className="absolute top-12 right-20 flex items-center justify-end w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
				role="alert">
				<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
					<SuccessSvg />

					<span className="sr-only">Check icon</span>
				</div>
				<div className="ms-3 text-sm font-normal">User Create success</div>
				<button
					type="button"
					className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
					data-dismiss-target="#toast-success"
					aria-label="Close">
					<span className="sr-only">Close</span>
					<CloseSvg />
				</button>
			</div>
		</div>
	);
}
