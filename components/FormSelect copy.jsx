export default function FormSelect({ name, label, value, children, ...rest }) {
  return (
    <div className="w-full">
      <label
        htmlFor={value ? "1" : "0"}
        className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        name={name}
        id={value ? "1" : "0"}
        defaultValue={value ? 1 : "0"}
        {...rest}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {children}
      </select>
    </div>
  );
}
