"use client";
import { Select } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FormSelect({
	selectPlaceHolder,
	selectData,
	name,
	defaultSelectedData,
}) {
	const searchParams = useSearchParams();
	const queryBy = searchParams.get("queryBy");
	const defaultSelectValue = queryBy
		? { value: queryBy, label: queryBy }
		: defaultSelectedData;
	const [value, setValue] = useState(defaultSelectValue);

	return (
		<Select
			placeholder={selectPlaceHolder}
			data={selectData}
			name={name}
			value={value ? value.value : null}
			onChange={(_value, option) => setValue(option)}
			clearable
			allowDeselect
			checkIconPosition="right"
			size="xs"
			className="min-w-[8rem]"
			comboboxProps={{ width: 200, position: "bottom-start" }}
		/>
	);
}
