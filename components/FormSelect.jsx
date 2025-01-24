"use client";
import { NativeSelect, Select } from "@mantine/core";
import { useState } from "react";

// export default function FormSelect({ value, dropdownData }) {
export default function FormSelect({ label, placeholder, data, name }) {
  const [value, setValue] = useState(null);
  return (
    <Select
      // label="Publish the Post?"
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

// <NativeSelect
//   size="xs"
//   placeholder="Search For"
//   defaultValue={value}
//   data={dropdownData}
//   className="w-24"
// />
// <Select
// 	size="xs"
// 	clearable
// 	allowDeselect
// 	placeholder="Search For"
// 	defaultValue={value}
// 	data={dropdownData}
// />
