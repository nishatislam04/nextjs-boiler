import Pagination from "@/components/Pagination";
import Search from "@/components/search";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import AddSvg from "@/prisma/svg/Add";
import TableAction from "@/components/TableAction";
import TableCheckbox from "@/components/TableCheckbox";
import TableHeader from "@/components/TableHeader";
import TableHeaderAction from "@/components/TableHeaderAction";
import GoBack from "@/components/GoBack";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import UserTable from "@/components/Table";
import Table from "@/components/Table";
import { format } from "date-fns";
import Toast from "@/components/Toast";
import { deletePost } from "@/repository/actions/posts/delete";
import { ScrollArea } from "@mantine/core";
import { CURRENT_PAGE, PER_PAGE } from "@/config/settings";
import {
  fetchTotalPostsUserCount,
  fetchUserPosts,
} from "@/repository/user/dal";
import { title } from "process";
import { sortData } from "@/lib/helpers";

export default async function PostPage({ params, searchParams }) {
  const id = (await params).id;
  const itemPerPage = PER_PAGE;
  const searchQuery = await searchParams;
  const query = searchQuery?.query || "";
  const currentPage = searchQuery?.page || CURRENT_PAGE;
  const titleSorting = { title: searchQuery?.titleSorting || null };
  const publishedSorting = { published: searchQuery?.publishedSorting || null };
  const createdAtSorting = { createdAt: searchQuery?.createdatSorting || null };
  const orderBy = sortData([titleSorting, publishedSorting, createdAtSorting], {
    createdAt: "desc",
  });

  const user = await fetchUserPosts(currentPage, id, orderBy, query);
  let { totalPages } = await fetchTotalPostsUserCount(id);
  totalPages = Math.ceil(totalPages / itemPerPage);

  const tableHeader = [
    { label: "title", willSort: true },
    { label: "shortDescription", willSort: false },
    { label: "published", willSort: true },
    { label: "created At", willSort: true },
    { label: "action", willSort: false },
  ];
  const tableDataId = ["title", "shortDescription", "published", "createdAt"];

  return (
    <div className="relative mx-auto mt-12 max-w-screen-xl p-4">
      <div className="relative">
        <GoBack />
        <Toast />

        <TableHeaderAction
          placeholder="Search for post title"
          authorId={user.id}
          queryValue={query}
          tableName="post"
        />

        <Suspense fallback={<Spinner />}>
          <Table
            name="post"
            datas={user.posts}
            tableHeader={tableHeader}
            currentPage={currentPage}
            searchQuery={query}
            deleteAction={deletePost}
            tableDataId={tableDataId}
            renderCell={(data, field) => {
              if (field === "published") {
                return (
                  <span className="">
                    {data.published ? "published" : "not published"}
                  </span>
                );
              }
              if (field === "createdAt") {
                return <span className="">{data.createdAt}</span>;
              }
              // Default rendering for other fields
              return data[field] || "N/A";
            }}
          />
        </Suspense>

        <Pagination
          uri={user.id} // uri: /post/cm66j0ikt0000pf1cp89q5her?page=1
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
