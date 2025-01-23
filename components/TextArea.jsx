export default function TextArea({
	label,
	name,
	row = "4",
	placeholder = "Input Text-Area",
	helperMessage,
	value,
	classes = "",
	...rest
}) {
	return (
		<div className={`mb-5 ${classes}`}>
			<label
				htmlFor={name}
				className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
				{label}
			</label>
			<textarea
				id={name}
				name={name}
				rows={row}
				defaultValue={value}
				{...rest}
				className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder={placeholder}></textarea>
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
