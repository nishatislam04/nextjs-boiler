import AddSvg from "@/svg/Add";
import Button from "./Button";
import Search from "./search";

export default function TableHeaderAction({ queryValue, tableName }) {
	return (
		<div className="flex justify-start items-center gap-3 mb-6 p-2 w-full ">
			{/* drop down button */}
			<button
				id="dropdownRadioButton"
				data-dropdown-toggle="dropdownRadio"
				className="w-52 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
				type="button">
				<svg
					className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20">
					<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
				</svg>
				Last 30 days
				<svg
					className="w-2.5 h-2.5 ms-2.5"
					aria-hidden="true"
					fill="none"
					viewBox="0 0 10 6">
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
			</button>
			{/* dropdown menu */}
			<div
				id="dropdownRadio"
				className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
				data-popper-reference-hidden=""
				data-popper-escaped=""
				data-popper-placement="top"
				style={{
					position: "absolute",
					inset: "auto auto 0px 0px",
					margin: "0px",
					transform: "translate3d(522.5px, 3847.5px, 0px)",
				}}>
				<ul
					className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownRadioButton">
					<li>
						<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
							<input
								id="filter-radio-example-1"
								type="radio"
								value=""
								name="filter-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								htmlFor="filter-radio-example-1"
								className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
								Last day
							</label>
						</div>
					</li>
					<li>
						<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
							<input
								id="filter-radio-example-2"
								type="radio"
								value=""
								name="filter-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								htmlFor="filter-radio-example-2"
								className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
								Last 7 days
							</label>
						</div>
					</li>
					<li>
						<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
							<input
								id="filter-radio-example-3"
								type="radio"
								value=""
								name="filter-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								htmlFor="filter-radio-example-3"
								className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
								Last 30 days
							</label>
						</div>
					</li>
					<li>
						<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
							<input
								id="filter-radio-example-4"
								type="radio"
								value=""
								name="filter-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								htmlFor="filter-radio-example-4"
								className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
								Last month
							</label>
						</div>
					</li>
					<li>
						<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
							<input
								id="filter-radio-example-5"
								type="radio"
								value=""
								name="filter-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								htmlFor="filter-radio-example-5"
								className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
								Last year
							</label>
						</div>
					</li>
				</ul>
			</div>

			{/* search */}
			<Search query={queryValue} />

			<Button
				href="#"
				padding="px-3 py-2"
				btnClasses="ml-auto text-sm font-medium">
				<AddSvg />
				Add {tableName}
			</Button>
		</div>
	);
}
