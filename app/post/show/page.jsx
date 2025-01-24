import Button from "@/components/Button";
import Form from "@/components/Form";
import FormSelect from "@/components/FormSelect";
import GoBack from "@/components/GoBack";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import prisma from "@/lib/db";
import { format } from "date-fns";
import { fetchPost } from "@/repository/post/dal";
import ShowPostForm from "./Form";

export default async function ShowPostPage({ searchParams }) {
  const params = await searchParams;
  const id = +params.id || "";

  const post = await fetchPost(id);

  return (
    <div className="mx-auto mt-12 max-w-screen-xl p-4">
      <div className="relative">
        <GoBack />

        <h1 className="mb-5 text-2xl font-bold">Show Post</h1>

        <ShowPostForm post={post} />
      </div>
    </div>
  );
}
