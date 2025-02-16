"use client";

export default function Error({ error, reset }) {
	return (
		<div className="w-full max-h-screen relative flex flex-col items-center justify-center bg-gray-50">
			<div className="flex flex-col items-center justify-center min-w-[80%] w-[60%] max-w-[90%]">
				<p className="text-5xl md:text-6xl lg:text-4xl font-bold tracking-wider text-gray-600 mt-4">
					Something Went Wrong While Showing UserPage!
				</p>
				<p
					className={`w-full mt-8 px-4 py-8 bg-red-400 text-white leading-6 rounded-md border border-gray-300 shadow-md max-h-60 overflow-y-auto whitespace-pre-wrap`}>
					{error.message || "A global error occurred."}
				</p>
			</div>
			<button
				onClick={reset}
				className="absolute top-0 right-12 mt-14 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
				Reload
			</button>
		</div>
	);
}
