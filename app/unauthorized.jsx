export default function Unauthorized() {
	return (
		<main className="flex justify-stretch items-center max-w-screen-xl min-h-[calc(100vh-var(--nav-height))] bg-gray-50">
			<section className="w-full mx-auto min-h-[calc(60vh-var(--nav-height))] flex flex-col justify-center items-center gap-2 border border-gray-200 rounded-lg">
				<h1 className="font-light uppercase text-gray-500 text-5xl">
					401 - Unauthorized
				</h1>
				<p className="font-light uppercase text-gray-400 text-xl">
					Please log in to access this page.
				</p>
			</section>
		</main>
	);
}
