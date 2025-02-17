"use client";
import { Select } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FormSelect({
	selectPlaceHolder,
	selectData,
	name,
	value,
	onChange,
}) {
	return (
		<Select
			placeholder={selectPlaceHolder}
			data={selectData}
			name={name}
			value={value}
			onChange={onChange}
			// clearable
			allowDeselect
			checkIconPosition="right"
			size="xs"
			className="min-w-[8rem]"
			comboboxProps={{ width: 200, position: "bottom-start" }}
		/>
	);
}
