import Link from "next/link";
import TableAction from "@/components/TableAction";
import TableHeader from "@/components/TableHeader";
import TableCheckbox from "@/components/TableCheckbox";
import { ScrollArea } from "@mantine/core";

export default async function Table({
	name,
	currentPage,
	searchQuery,
	tableHeader,
	deleteAction,
	datas = [],
	tableDataId = [],
	renderCell,
}) {
	if (!datas) return notFound();

	return (
		<ScrollArea
			h={250}
			type="scroll"
			scrollHideDelay={1500}>
			<table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<TableHeader header={tableHeader} />
				</thead>
				<tbody>
					{datas.length === 0 ? (
						<tr>
							<th
								className="text-gray-400 text-center py-6 text-4xl"
								colSpan={5}>
								No {name}&apos;s found
							</th>
						</tr>
					) : (
						datas.map((data) => (
							<tr
								key={data.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<td className="w-4 p-4">
									<TableCheckbox />
								</td>
								{tableDataId.map((field, fieldIndex) => (
									<td
										key={fieldIndex}
										className="px-6 py-4 max-w-[230px] min-w-[50px] truncate text-ellipsis overflow-hidden whitespace-nowrap">
										{renderCell
											? renderCell(data, field)
											: data[field] || "Default data"}
									</td>
								))}
								<TableAction
									deleteAction={deleteAction}
									uri={name}
									data={data}
								/>
							</tr>
						))
					)}
				</tbody>
			</table>
		</ScrollArea>
	);
}
