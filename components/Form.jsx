export default function Form({ className, action, children }) {
	const baseClasses = `bg-gray-100 py-6 px-3 rounded-lg ${className} `;
	return (
		<form
			action={action}
			className={baseClasses}>
			{children}
		</form>
	);
}
