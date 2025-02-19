import Pagination from "@/components/ui/Pagination";
import TableHeaderAction from "@/components/TableHeaderAction";
import GoBack from "@/components/ui/GoBack";
import React, { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import Toast from "@/components/ui/Toast";
import { CURRENT_PAGE, PER_PAGE } from "@/lib/settings";
import {
  fetchTotalPostsUserCount,
  fetchUserPosts,
} from "@/lib/repository/user/dal";
import helpers from "@/lib/helpers";
import UserPostListingsTable from "./Table";
import { checkAuthAndRoles } from "@/lib/authHelper";
import { SessionProvider } from "next-auth/react";
import UserProvider from "@/context/AuthUserContext";
import Logger from "@/lib/logger";
import { Anchor, Button } from "@mantine/core";
import Link from "next/link";
import AddSvg from "@/components/svg/Add";

/**
 * USER PERSONAL POST LISTINGS
 *
 * @param param0 - USERID
 */
export default async function UserPostPage({ searchParams }) {
  const searchQuery = await searchParams;
  const id = searchQuery.id;
  const authUser = await checkAuthAndRoles(`/user/personalPostListings/${id}`);
  if (React.isValidElement(authUser)) return authUser;

  const itemPerPage = PER_PAGE;
  const queryBy = searchQuery?.queryBy || "";
  const queryFor = searchQuery?.queryFor || "";
  const currentPage = searchQuery?.page || CURRENT_PAGE;
  const titleSorting = { title: searchQuery?.titleSorting || null };
  const publishedSorting = {
    published: searchQuery?.publishedSorting || null,
  };
  const createdAtSorting = {
    createdAt: searchQuery?.createdatSorting || null,
  };
  const orderBy = helpers.sortData(
    [titleSorting, publishedSorting, createdAtSorting],
    {
      createdAt: "desc",
    },
  );

  const userPostListings = await fetchUserPosts(
    currentPage,
    id,
    orderBy,
    queryFor,
    queryBy,
  );
  const totalPostCount = queryFor
    ? userPostListings.posts.length
    : await fetchTotalPostsUserCount(id);
  const totalPages = Math.ceil(totalPostCount / itemPerPage);

  return (
    <main className="relative mx-auto mt-12 flex min-h-[calc(90vh-var(--nav-height))] max-w-screen-xl flex-col items-center">
      {/* go back */}
      <section className="absolute -top-8 right-0">
        <GoBack />
      </section>
      <Toast />

      <Suspense fallback={<Spinner />}>
        <SessionProvider>
          <UserProvider>
            <UserPostListingsTable posts={userPostListings.posts}>
              <TableHeaderAction
                selectPlaceHolder="Search For"
                selectData={[
                  { value: "title", label: "Title" },
                  { value: "shortDescription", label: "Description" },
                ]}
                defaultSelectedData={{
                  value: "title",
                  label: "Title",
                }}
                queryPlaceholder="Search for post title"
                authorId={userPostListings.id}
                queryValue={queryFor}
                tableName="post"
              >
                <section className="ml-auto">
                  <Button
                    size="xs"
                    variant="filled"
                    color="indigo"
                    component={Link}
                    href={`/post/create?id=${userPostListings.id}`}
                  >
                    <AddSvg />
                    Add Post
                  </Button>
                </section>
              </TableHeaderAction>
            </UserPostListingsTable>
          </UserProvider>
        </SessionProvider>
      </Suspense>

      <Pagination
        uri={`/post?id=${id}`}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </main>
  );
}
