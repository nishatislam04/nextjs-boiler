"use client";
import { Select } from "@mantine/core";
import { useState } from "react";

export default function FormSelect({ label, placeholder, data, name }) {
	const [value, setValue] = useState(null);
	return (
		<Select
			label={label}
			placeholder={placeholder}
			data={data}
			name={name}
			value={value ? value.value : null}
			onChange={(_value, option) => setValue(option)}
			clearable
			allowDeselect
			checkIconPosition="right"
			size="xs"
		/>
	);
}
