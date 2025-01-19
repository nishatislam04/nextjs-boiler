export default function Loading() {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
			<div className="px-3 py-1 text-2xl capitalize font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
				loading...
			</div>
		</div>
	);
}
