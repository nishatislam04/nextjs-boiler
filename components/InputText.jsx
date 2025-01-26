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
        className="relative mb-1 text-sm font-medium capitalize text-gray-900 dark:text-white"
      >
        {label}
        {required && (
          <span className="absolute -right-2 top-0 text-xs text-red-500">
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
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={placeholder}
      />
      {helperMessage && (
        <p
          className="-mt-0 pl-1 text-xs capitalize text-gray-400 dark:text-gray-300"
          id="bio_input_help"
        >
          {helperMessage}
        </p>
      )}
    </div>
  );
}
