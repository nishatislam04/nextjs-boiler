import Sort from "./Sort";
import TableCheckbox from "./TableCheckbox";

export default function TableHeader({ header }) {
	return (
		<tr className="bg-gray-50 dark:bg-gray-700">
			<th
				key="xx"
				scope="col"
				className="px-5 py-3">
				<TableCheckbox />
			</th>
			{header.map((data) => (
				<th
					key={data.label}
					scope="col"
					className="px-6 py-3">
					<div className="flex items-center space-x-2">
						{data.willSort ? (
							<Sort>{data.label}</Sort>
						) : (
							<span>{data.label}</span>
						)}
					</div>
				</th>
			))}
		</tr>
	);
}
