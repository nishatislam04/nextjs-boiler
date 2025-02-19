import Pagination from "@/components/ui/Pagination";
import React, { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import Toast from "@/components/ui/Toast";
import TableHeaderAction from "@/components/TableHeaderAction";
import { fetchTotalCount, fetchUserListings } from "@/lib/repository/user/dal";
import { CURRENT_PAGE, PER_PAGE } from "@/lib/settings";
import helpers from "@/lib/helpers";
import UserListingsTable from "./Table";
import { checkAuthAndRoles } from "@/lib/authHelper";
import { SessionProvider } from "next-auth/react";
import UserProvider from "@/context/AuthUserContext";
import Logger from "@/lib/logger";
import AuthorizedView from "@/components/ui/auth/AuthorizedView";
import { Anchor, Button } from "@mantine/core";
import Link from "next/link";
import AddSvg from "@/components/svg/Add";

export default async function UserPage({ searchParams }) {
  const authUser = await checkAuthAndRoles("/dashboard/userPage");
  if (React.isValidElement(authUser)) return authUser;

  const params = await searchParams;
  const queryFor = params?.queryFor || "";
  const queryBy = params?.queryBy || "";
  const currentPage = params?.page || CURRENT_PAGE;
  const nameSort = { name: params?.nameSorting || null };
  const emailSort = { email: params?.emailSorting || null };
  const orderBy = helpers.sortData([nameSort, emailSort], { name: "asc" });

  const userListings = await fetchUserListings(
    currentPage,
    queryFor,
    queryBy,
    orderBy,
  );
  const totalUsers = queryFor ? userListings.length : await fetchTotalCount();
  const totalPages = Math.ceil(totalUsers / PER_PAGE);

  return (
    <main className="relative mx-auto mt-12 flex min-h-[calc(90vh-var(--nav-height))] w-full max-w-screen-xl flex-col items-center">
      <Toast />

      <Suspense fallback={<Spinner />}>
        <SessionProvider>
          <UserProvider>
            <UserListingsTable users={userListings}>
              <TableHeaderAction
                selectPlaceHolder="Search For"
                selectData={[
                  { value: "name", label: "Name" },
                  { value: "email", label: "Email" },
                ]}
                defaultSelectedData={{ value: "name", label: "Name" }}
                queryValue={queryFor}
                queryPlaceholder="Search for user"
                tableName="User"
              >
                <AuthorizedView pathname="/dashboard/user/createBtn">
                  <section className="ml-auto">
                    <Button
                      size="xs"
                      variant="filled"
                      color="violet"
                      component={Link}
                      href="/dashboard/user/create"
                    >
                      <AddSvg />
                      Add User
                    </Button>
                  </section>
                </AuthorizedView>
              </TableHeaderAction>
            </UserListingsTable>
          </UserProvider>
        </SessionProvider>
      </Suspense>

      <Pagination
        uri="/dashboard/user"
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </main>
  );
}
