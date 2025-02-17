import AddSvg from "@/components/svg/Add";
import Search from "./form/search";
import { Anchor, Button } from "@mantine/core";
import Link from "next/link";
import AuthorizedView from "./ui/auth/AuthorizedView";
import { headers } from "next/headers";

export default async function TableHeaderAction({
  authorId = "",
  queryValue,
  tableName,
  queryPlaceholder,
  selectPlaceHolder,
  selectData,
  defaultSelectedData,
}) {
  const headersList = await headers();
  const fullUrl = headersList.get("referer") || ""; // Get previous URL
  const pathname = new URL(fullUrl, "http://localhost").pathname; // Extract pathname

  const isDashboardPost = pathname.includes("dashboard/post"); // Check if pathname contains it

  return (
    <section className="flex w-full items-center justify-start gap-3 py-3">
      {/* search */}
      <Search
        selectPlaceHolder={selectPlaceHolder}
        selectData={selectData}
        queryValue={queryValue}
        queryPlaceholder={queryPlaceholder}
        defaultSelectedData={defaultSelectedData}
      />

      {/* create button */}
      <AuthorizedView
        showForOwner={tableName.toLowerCase() === "user" ? false : true}
        authorId={authorId}
        pathname="/dashboard/user/createBtn"
      >
        {!isDashboardPost && (
          <section className="ml-auto">
            <Anchor
              variant="filled"
              color="indigo"
              component={Link}
              href={
                tableName.toLowerCase() === "user"
                  ? `/dashboard/user/create`
                  : `/post/create?id=${authorId}`
              }
              prefetch
            >
              <span className="flex gap-0">
                <Button size="xs" variant="filled" color="violet">
                  <AddSvg />
                  Add {tableName}
                </Button>
              </span>
            </Anchor>
          </section>
        )}
      </AuthorizedView>
    </section>
  );
}
