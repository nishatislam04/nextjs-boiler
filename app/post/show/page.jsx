import GoBack from "@/components/ui/GoBack";
import { fetchPost } from "@/lib/repository/post/dal";
import ShowPostForm from "./Form";
import React from "react";
import { notFound } from "next/navigation";

export default async function ShowPostPage({ searchParams }) {
  const params = await searchParams;
  const id = +params.id;

  if (!id) notFound();

  const post = await fetchPost(id);

  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-var(--nav-height))] max-w-screen-xl items-center justify-stretch">
      {/* go back */}
      <section className="absolute right-0 top-0">
        <GoBack />
      </section>
      <section className="h-full w-full">
        <h1 className="mb-2 text-2xl font-bold">Show Post</h1>

        <ShowPostForm post={post} />
      </section>
    </main>
  );
}
