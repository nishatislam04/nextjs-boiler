"use client";
import { useState } from "react";
import { Button, Table, Checkbox, Text } from "@mantine/core";
import Link from "next/link";
import DeleteModal from "@/components/ui/DeleteModal";
import ViewSvg from "@/components/svg/View";
import EditSvg from "@/components/svg/Edit";
import { deletePost } from "@/lib/repository/actions/posts/delete";
import Sort from "@/components/ui/Sort";
import AuthorizedView from "@/components/ui/auth/AuthorizedView";

export default function UserPostListingsTable({ authorId, posts, children }) {
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
      <Table.Td>
        <Text size={"sm"} lineClamp={1}>
          {post.title}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size={"sm"} lineClamp={1}>
          {post.shortDescription}
        </Text>
      </Table.Td>

      <Table.Td>{post.published}</Table.Td>
      <Table.Td>{post.createdAt}</Table.Td>
      <Table.Td>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link href={`/dashboard/post/show?id=${post.id}`}>
            <Button size="compact-xs" color="indigo">
              <ViewSvg />
              View
            </Button>
          </Link>
          <AuthorizedView
            showForOwner="true"
            authorId={authorId}
            pathname="/dashboard/userPost/editBtn"
          >
            <Link href={`/dashboard/post/edit?id=${post.id}`}>
              <Button size="compact-xs" color="orange">
                <EditSvg />
                Edit
              </Button>
            </Link>
          </AuthorizedView>

          <AuthorizedView pathname="/dashboard/userPost/deleteBtn">
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
      <Table.ScrollContainer minWidth={800} className="min-w-full">
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
                    selectedRows.length > 0 &&
                    selectedRows.length < posts.length
                  }
                  onChange={handleSelectAll}
                />
              </Table.Th>
              <Table.Th>
                <Sort>Title</Sort>
              </Table.Th>
              <Table.Th>Short Description</Table.Th>
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
              <Table.Tr key="post-not-found">
                <Table.Td
                  colSpan={6}
                  className="py-4 text-center text-xl uppercase text-gray-300"
                >
                  Search results not found
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
