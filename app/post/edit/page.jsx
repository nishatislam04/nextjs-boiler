import GoBack from "@/components/ui/GoBack";
import PostEditPage from "./Form";
import { fetchPost } from "@/lib/repository/post/dal";
import { fetchActiveCategories } from "@/lib/repository/category/dal";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";
import sessionHelper from "@/lib/sessionHelper";
import Logger from "@/lib/logger";
import { unauthorized } from "next/navigation";

export default async function EditPostPage({ searchParams }) {
  const authUser = await checkAuthAndRoles("/post/editPage");
  if (React.isValidElement(authUser)) return authUser;

  const params = await searchParams;
  const id = +params.id || "";
  let categories = await fetchActiveCategories();
  categories = categories.map((category) => {
    return {
      value: String(category.id),
      label: category.name,
    };
  });

  const post = await fetchPost(id);
  const session = await sessionHelper.getUserSession();
  // only owner can edit their post
  if (session.userId !== post.author.id) return unauthorized();

  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-var(--nav-height))] max-w-screen-xl flex-col items-stretch justify-center">
      {/* go back */}
      <section className="absolute right-0 top-0">
        <GoBack />
      </section>
      <section className="h-full">
        <h1 className="mb-2 text-2xl font-bold">Edit Post</h1>

        <PostEditPage
          post={post}
          categories={categories}
          authorId={session.userId}
          postId={id}
        />
      </section>
    </main>
  );
}
