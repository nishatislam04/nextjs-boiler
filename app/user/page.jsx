import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import UserTable from "../../components/Table";
import Spinner from "@/components/Spinner";
import prisma from "@/lib/db";
import Toast from "@/components/Toast";
import TableHeaderAction from "@/components/TableHeaderAction";
import Table from "../../components/Table";
import Link from "next/link";
import Button from "@/components/Button";
import GoBack from "@/components/GoBack";
import { deleteUser } from "@/repository/actions/users/delete";
import { Anchor, ScrollArea } from "@mantine/core";
import redis from "@/lib/redis";
import { fetchAll, fetchTotalCount } from "@/repository/user/dal";
import { CURRENT_PAGE, PER_PAGE } from "@/config/settings";
import { sortData } from "@/lib/helpers";

export default async function UserPage({ searchParams }) {
  const params = await searchParams;
  const searchQuery = params?.query || "";
  const currentPage = params?.page || CURRENT_PAGE;
  const nameSort = { name: params?.nameSorting || null };
  const emailSort = { email: params?.emailSorting || null };
  const orderBy = sortData([nameSort, emailSort], { name: "asc" });

  let users = null;
  users = await fetchAll(currentPage, searchQuery, orderBy);
  let totalUsers = await fetchTotalCount();
  const totalPages = Math.ceil(totalUsers / PER_PAGE);

  const tableHeader = [
    { label: "Name", willSort: true },
    { label: "email", willSort: true },
    { label: "profile", willSort: false },
    { label: "Posts", willSort: false },
    { label: "Actions", willSort: false },
  ];
  const tableDataId = ["name", "email", "profile", "posts"];

  return (
    <div className="max-w-(--breakpoint-xl) relative mx-auto mt-12 p-4">
      <Toast />

      <TableHeaderAction queryValue={searchQuery} tableName="User" />

      <Suspense fallback={<Spinner />}>
        <Table
          name="user"
          datas={users}
          tableHeader={tableHeader}
          tableDataId={tableDataId}
          deleteAction={deleteUser}
          currentPage={currentPage}
          searchQuery={searchQuery}
          renderCell={(data, field) => {
            if (field === "profile") {
              return (
                <Anchor
                  component={Link}
                  href={`/user/${data.id}`}
                  underline="hover"
                >
                  profile
                </Anchor>
              );
            }
            if (field === "posts") {
              return (
                <Anchor
                  component={Link}
                  href={`post/${data.id}`}
                  underline="hover"
                >
                  Posts
                </Anchor>
              );
            }
            // Default rendering for other fields
            return data[field] || "N/A";
          }}
        />
      </Suspense>

      <Pagination
        uri="user"
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
