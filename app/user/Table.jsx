"use client";
import { useState } from "react";
import { Anchor, Button, Table, Checkbox } from "@mantine/core";
import Link from "next/link";
import DeleteModal from "@/components/ui/DeleteModal";
import ViewSvg from "@/prisma/svg/View";
import EditSvg from "@/prisma/svg/Edit";
import { deleteUser } from "@/lib/repository/actions/users/delete";
import Sort from "@/components/ui/Sort";

export default function UserListingsTable({ users }) {
	const [selectedRows, setSelectedRows] = useState([]);

	const handleSelectAll = (event) => {
		if (event.currentTarget.checked) {
			setSelectedRows(users.map((user) => user.id));
		} else {
			setSelectedRows([]);
		}
	};

	const rows = users.map((user) => (
		<Table.Tr
			key={user.id}
			bg={
				selectedRows.includes(user.id)
					? "var(--mantine-color-blue-light)"
					: undefined
			}>
			{/* Row Checkbox */}
			<Table.Td>
				<Checkbox
					aria-label={`Select row for user ${user.name}`}
					checked={selectedRows.includes(user.id)}
					onChange={(event) =>
						setSelectedRows(
							event.currentTarget.checked
								? [...selectedRows, user.id]
								: selectedRows.filter((id) => id !== user.id)
						)
					}
				/>
			</Table.Td>
			<Table.Td>{user.name}</Table.Td>
			<Table.Td>{user.email}</Table.Td>
			<Table.Td>
				<Anchor
					component={Link}
					href={`/user/${user.id}`}>
					Profile
				</Anchor>
			</Table.Td>
			<Table.Td>
				<Anchor
					component={Link}
					href={`/post/${user.id}`}>
					Posts
				</Anchor>
			</Table.Td>
			<Table.Td>
				<div style={{ display: "flex", gap: "8px" }}>
					<Link href={`/user/show?id=${user.id}`}>
						<Button
							size="compact-xs"
							color="indigo">
							<ViewSvg />
							View
						</Button>
					</Link>
					<Link href={`/user/edit?id=${user.id}`}>
						<Button
							size="compact-xs"
							color="orange">
							<EditSvg />
							Edit
						</Button>
					</Link>
					<DeleteModal
						id={user.id}
						deleteAction={deleteUser}
						title="Delete User"
						message={`Are you sure you want to delete this User?`}
					/>
				</div>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Table.ScrollContainer minWidth={800}>
			<Table
				stickyHeader
				verticalSpacing="md"
				striped
				highlightOnHover
				withTableBorder
				withColumnBorders>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>
							<Checkbox
								aria-label="Select all rows"
								checked={
									selectedRows.length === users.length && users.length > 0
								}
								indeterminate={
									selectedRows.length > 0 &&
									selectedRows.length < users.length
								}
								onChange={handleSelectAll}
							/>
						</Table.Th>
						<Table.Th>
							<Sort>Name</Sort>
						</Table.Th>
						<Table.Th>
							<Sort>Email</Sort>
						</Table.Th>
						<Table.Th>Profile</Table.Th>
						<Table.Th>Posts</Table.Th>
						<Table.Th>Actions</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
}
