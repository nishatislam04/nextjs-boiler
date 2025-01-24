import Button from "@/components/Button";
import PostCreateForm from "@/app/post/create/Form";
import GoBack from "@/components/GoBack";
import { fetchActiveCategories } from "@/repository/category/dal";
import { fetchActiveTags } from "@/repository/tag/dal";
import { createPost } from "@/repository/actions/posts/create";
import FormSelect from "@/components/FormSelect";

export default async function PostCreatePage({ searchParams }) {
  const authorId = (await searchParams).authorId;
  let categories = await fetchActiveCategories();
  categories = categories.map((category) => {
    return {
      value: String(category.id),
      label: category.name,
    };
  });

  return (
    <div className="relative mx-auto mt-12 max-w-screen-xl p-4">
      <div className="relative">
        <GoBack />

        <h1 className="mb-5 text-2xl font-bold">Create Post</h1>

        <PostCreateForm authorId={authorId} categories={categories} />
      </div>
    </div>
  );
}
