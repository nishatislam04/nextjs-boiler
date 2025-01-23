export default function InputText({
	label,
	name,
	placeholder = "Text Input",
	className = "",
	type = "text",
	required = false,
	value = "",
	helperMessage = "",
	...rest
}) {
	const baseClasses = `mb-4 w-1/2 ${className}`;

	return (
		<div className={baseClasses}>
			<label
				htmlFor={name}
				className="relative mb-1 text-sm font-medium text-gray-900 dark:text-white capitalize">
				{label}
				{required && (
					<span className="absolute top-0 -right-2 text-red-500 text-xs">
						*
					</span>
				)}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				defaultValue={value}
				required={required}
				{...rest}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder={placeholder}
			/>
			{helperMessage && (
				<p
					className="-mt-0 text-xs pl-1  text-gray-400 dark:text-gray-300 capitalize"
					id="bio_input_help">
					{helperMessage}
				</p>
			)}
		</div>
	);
}
