export default function Loading() {
	return (
		<div className="max-w-screen-xl mx-auto p-4 mt-12 flex items-center justify-center min-w-screen min-h-[30rem] border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
			<div className="min-w-full min-h-full px-3 text-2xl capitalize font-medium leading-none text-center text-blue-800 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200 py-10">
				loading...
			</div>
		</div>
	);
}
