import Button from "@/components/Button";
import Form from "@/components/Form";
import GoBack from "@/components/GoBack";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

import { updatePost } from "@/repository/actions/posts/update";
import FormSelect from "@/components/FormSelect";
import PostEditPage from "./Form";
import { fetchPost } from "@/repository/post/dal";
import { fetchActiveCategories } from "@/repository/category/dal";

export default async function EditPostPage({ searchParams }) {
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

  return (
    <div className="relative mx-auto mt-12 max-w-screen-xl p-4">
      <div className="relative">
        <GoBack />

        <h1 className="mb-5 text-2xl font-bold">Edit Post</h1>

        <PostEditPage post={post} categories={categories} authorId={id} />
      </div>
    </div>
  );
}
