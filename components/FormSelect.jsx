import { NativeSelect, Select } from "@mantine/core";

export default function FormSelect({ value, dropdownData }) {
  return (
    <NativeSelect
      size="xs"
      placeholder="Search For"
      defaultValue={value}
      data={dropdownData}
      className="w-24"
    />
    // <Select
    // 	size="xs"
    // 	clearable
    // 	allowDeselect
    // 	placeholder="Search For"
    // 	defaultValue={value}
    // 	data={dropdownData}
    // />
  );
}
