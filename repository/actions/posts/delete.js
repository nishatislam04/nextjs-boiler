"use server";

import prisma from "@/lib/db";
import { invalidateUserCache } from "@/lib/helpers";
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

    // await invalidateUserCache("user:posts:*");
    revalidatePath(`/post/${authorId}`);
    return {
      status: "success",
      message: "Post Delete Success",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete the Post.",
    };
  }
}
