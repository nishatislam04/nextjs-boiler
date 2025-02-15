"use client";
import { useState } from "react";
import { Button, Table, Checkbox } from "@mantine/core";
import Link from "next/link";
import DeleteModal from "@/components/ui/DeleteModal";
import ViewSvg from "@/components/svg/View";
import EditSvg from "@/components/svg/Edit";
import { deletePost } from "@/lib/repository/actions/posts/delete";
import Sort from "@/components/ui/Sort";
import AuthorizedView from "@/components/ui/auth/AuthorizedView";

export default function UserPostListingsTable({ posts, children }) {
	const [selectedRows, setSelectedRows] = useState([]);

	const handleSelectAll = (event) => {
		if (event.currentTarget.checked) {
			setSelectedRows(posts.map((user) => user.id));
		} else {
			setSelectedRows([]);
		}
	};

	const rows = posts.map((post) => (
		<Table.Tr
			key={post.id}
			bg={
				selectedRows.includes(post.id)
					? "var(--mantine-color-blue-light)"
					: undefined
			}>
			{/* Row Checkbox */}
			<Table.Td>
				<Checkbox
					aria-label={`Select row for post ${post.name}`}
					checked={selectedRows.includes(post.id)}
					onChange={(event) =>
						setSelectedRows(
							event.currentTarget.checked
								? [...selectedRows, post.id]
								: selectedRows.filter((id) => id !== post.id)
						)
					}
				/>
			</Table.Td>
			<Table.Td>{post.title}</Table.Td>
			<Table.Td>{post.shortDescription}</Table.Td>
			<Table.Td>{post.published}</Table.Td>
			<Table.Td>{post.createdAt}</Table.Td>
			<Table.Td>
				<div style={{ display: "flex", gap: "8px" }}>
					<Link href={`/post/show?id=${post.id}`}>
						<Button
							size="compact-xs"
							color="indigo">
							<ViewSvg />
							View
						</Button>
					</Link>
					<AuthorizedView pathname="/private/post/edit">
						<Link href={`/post/edit?id=${post.id}`}>
							<Button
								size="compact-xs"
								color="orange">
								<EditSvg />
								Edit
							</Button>
						</Link>
					</AuthorizedView>

					<AuthorizedView pathname="/private/post/delete">
						<DeleteModal
							id={post.id}
							deleteAction={deletePost}
							title="Delete Post"
							message={`Are you sure you want to delete this post?`}
						/>
					</AuthorizedView>
				</div>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<>
			{children}
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
										selectedRows.length === posts.length &&
										posts.length > 0
									}
									indeterminate={
										selectedRows.length > 0 &&
										selectedRows.length < posts.length
									}
									onChange={handleSelectAll}
								/>
							</Table.Th>
							<Table.Th>
								<Sort>Title</Sort>
							</Table.Th>
							<Table.Th>Description</Table.Th>
							<Table.Th>
								<Sort>Published</Sort>
							</Table.Th>
							<Table.Th>
								<Sort>created at</Sort>
							</Table.Th>
							<Table.Th>Actions</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{posts.length > 0 ? (
							rows
						) : (
							<Table.Tr key="no-post-found">
								<Table.Td
									colSpan={6}
									className="text-center text-gray-500 py-4 text-xl">
									No Post found
								</Table.Td>
							</Table.Tr>
						)}
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</>
	);
}
