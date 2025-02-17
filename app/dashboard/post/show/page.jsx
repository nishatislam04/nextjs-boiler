import GoBack from "@/components/ui/GoBack";
import { fetchPost } from "@/lib/repository/post/dal";
import ShowPostForm from "./Form";
// import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";

export default async function ShowPostPage({ searchParams }) {
  // const authUser = await checkAuthAndRoles("/dashboard/post/show");
  // if (React.isValidElement(authUser)) return authUser;

  const params = await searchParams;
  const id = +params.id || "";

  const post = await fetchPost(id);

  return (
    <div className="mx-auto mt-12 max-w-screen-xl p-4">
      <div className="relative">
        <div className="absolute -top-24 right-2 mb-8 mt-12">
          <GoBack />
        </div>
        <h1 className="mb-5 text-2xl font-bold">Show Post</h1>

        <ShowPostForm post={post} />
      </div>
    </div>
  );
}
