"use server";

import prisma from "@/lib/db";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(postId, formData) {
  const id = postId;
  try {
    const { authorId } = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        authorId: true,
      },
    });

    await prisma.post.delete({
      where: {
        id,
      },
    });

    console.log("Post deleted successfully:", authorId);
    revalidatePath(`/post/${authorId}`);
    return {
      status: "success",
      message: "Post Delete Success",
    };
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return {
      status: "error",
      message: "Failed to delete the Post.",
    };
  }
  // const id = postId;
  // const { authorId } = await prisma.post.findUnique({
  //   where: {
  //     id,
  //   },
  //   select: {
  //     authorId: true,
  //   },
  // });

  // await prisma.post.delete({
  //   where: {
  //     id,
  //   },
  // });

  // console.log(authorId);

  // await flashMessage("post delete success");
  // revalidatePath("/post");
  // redirect(`/post/${authorId}`);
}
