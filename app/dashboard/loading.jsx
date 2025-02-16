export default function Loading() {
	return (
		<main className="flex justify-stretch items-center max-w-screen-xl min-h-[calc(100vh-var(--nav-height))] bg-gray-50 dark:bg-gray-800">
			<section className="w-full mx-auto min-h-[calc(60vh-var(--nav-height))] flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-lg dark:border-gray-700">
				<div className="px-3 text-2xl capitalize font-medium leading-none text-center text-blue-800 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200 py-10">
					loading...
				</div>
			</section>
		</main>
	);
}
