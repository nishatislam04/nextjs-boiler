"use client";
import { useState } from "react";
import { Anchor, Button, Table, Checkbox } from "@mantine/core";
import Link from "next/link";
import DeleteModal from "@/components/DeleteModal";
import ViewSvg from "@/prisma/svg/View";
import EditSvg from "@/prisma/svg/Edit";
import { deletePost } from "@/repository/actions/posts/delete";
import Sort from "@/components/Sort";

export default function UserPostListingsTable({ posts }) {
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
      }
    >
      {/* Row Checkbox */}
      <Table.Td>
        <Checkbox
          aria-label={`Select row for post ${post.name}`}
          checked={selectedRows.includes(post.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, post.id]
                : selectedRows.filter((id) => id !== post.id),
            )
          }
        />
      </Table.Td>
      <Table.Td>{post.title}</Table.Td>
      <Table.Td>{post.description}</Table.Td>
      <Table.Td>{post.published ? "published" : "not published"}</Table.Td>
      <Table.Td>{post.createdAt}</Table.Td>
      <Table.Td>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link href={`/post/show?id=${post.id}`}>
            <Button size="compact-xs" color="indigo">
              <ViewSvg />
              View
            </Button>
          </Link>
          <Link href={`/post/edit?id=${post.id}`}>
            <Button size="compact-xs" color="orange">
              <EditSvg />
              Edit
            </Button>
          </Link>
          <DeleteModal
            id={post.id}
            deleteAction={deletePost}
            title="Delete Post"
            message={`Are you sure you want to delete this post?`}
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
        withColumnBorders
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox
                aria-label="Select all rows"
                checked={
                  selectedRows.length === posts.length && posts.length > 0
                }
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < posts.length
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
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
