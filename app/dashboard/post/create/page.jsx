import PostCreateForm from "@/app/dashboard/post/create/Form";
import GoBack from "@/components/ui/GoBack";
import { checkAuthAndRoles } from "@/lib/authHelper";
import { fetchActiveCategories } from "@/lib/repository/category/dal";
import React from "react";

export default async function PostCreatePage({ searchParams }) {
  const authUser = await checkAuthAndRoles("/dashboard/post/create");
  if (React.isValidElement(authUser)) return authUser;

  const authorId = (await searchParams).authorId;
  let categories = await fetchActiveCategories();
  categories = categories.map((category) => {
    return {
      value: String(category.id),
      label: category.name,
    };
  });
  // categories = categories.map((category) => category.name);

  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-var(--nav-height))] max-w-screen-xl flex-col justify-center">
      {/* go back */}
      <section className="absolute top-0 right-0">
        <GoBack />
      </section>
      <section className="h-full">
        <h1 className="mb-2 text-2xl font-bold">Create Post</h1>

        <PostCreateForm authorId={authorId} categories={categories} />
      </section>
    </main>
  );
}
