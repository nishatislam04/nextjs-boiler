"use server";

import { auth } from "@/app/auth";
import helpers from "@/lib/helpers";
import prisma from "@/lib/prisma";
import redisCacheKey from "@/lib/redisCacheKey";
import { revalidatePath } from "next/cache";

export async function deletePost(postId) {
  const id = postId;
  const session = await auth();
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

    await redisCacheKey.invalidateCache(redisCacheKey.userPostListings);
    revalidatePath(`/dashboard/post/${session.userId}`);
    revalidatePath("/post");
    return {
      status: "success",
      showNotification: true,
      message: "Post Delete Success",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      showNotification: true,
      message: "Failed to delete the Post.",
    };
  }
}
