import TableCheckbox from "./TableCheckbox";

export default function TableHeader({ header }) {
	return (
		<tr>
			<th
				key="xx"
				scope="col"
				className="px-5 py-3">
				<TableCheckbox />
			</th>
			{header.map((data) => (
				<th
					key={data}
					scope="col"
					className="px-6 py-3">
					{data}
				</th>
			))}
		</tr>
	);
}
