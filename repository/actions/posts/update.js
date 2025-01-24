"use server";

import prisma from "@/lib/db";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePost(postId, formData) {
  const id = postId;
  const title = formData.get("title");
  const shortDescription = formData.get("shortDescription") || null;
  const description = formData.get("description") || null;
  const published = Boolean(formData.get("published"));
  let categories = formData.get("categories").split(",");
  let tags = formData.get("tags").split(",");

  console.log("post-update", categories, tags);

  const { authorId } = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      authorId: true,
    },
  });

  if (!authorId) {
    throw new Error("Post not found or invalid ID");
  }

  // Ensure tags are created if they don't exist
  const tagRecords = await Promise.all(
    tags.map(async (tagName) => {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });
      return tag;
    }),
  );

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      shortDescription,
      description,
      published,
      categories: {
        set: categories.map((categoryId) => ({ id: parseInt(categoryId, 10) })),
      },
      tags: {
        set: tagRecords.map((tag) => ({ id: tag.id })),
      },
    },
  });

  console.log(post);
  await flashMessage("post update success");
  revalidatePath("/post");
  redirect(`/post/${authorId}`);
}
