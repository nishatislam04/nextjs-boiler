"use client";

import Link from "next/link";

export default function Pagination({ totalPages, currentPage }) {
	const current = +currentPage;

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<nav
			aria-label="Page navigation example"
			className="mt-8 flex justify-center items-center">
			<ul className="inline-flex -space-x-px text-sm">
				<li>
					<Link
						href={`user?page=${current - 1}`}
						className={`${
							current === 1 && "pointer-events-none cursor-not-allowed"
						} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
						Previous
					</Link>
				</li>
				{pages.map((page) => (
					<li key={page}>
						<Link
							href={`user?page=${page}`}
							className={`${
								page === current
									? "text-green-500 bg-green-200 font-bold text-xl "
									: ""
							} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
							{page}
						</Link>
					</li>
				))}

				<li>
					<Link
						href={`user?page=${current + 1}`}
						className={`${
							current === totalPages &&
							"pointer-events-none cursor-not-allowed"
						} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
						Next
					</Link>
				</li>
			</ul>
		</nav>
	);
}
