"use server";

import FormErrorMessage from "@/lib/formErrorMessage";
import helpers from "@/lib/helpers";
import Logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import PrismaFormError from "@/lib/prismaValidationError";
import { updatePostSchema } from "@/lib/schema/post/update";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import redisCacheKey from "@/lib/redisCacheKey";
import { randomUUID } from "crypto";

const UPLOAD_DIR = "/app/public/uploads/postCoverPhoto/"; // Directory inside Docker container

export async function updatePost(postId, formData) {
  const validated = updatePostSchema.safeParse(formData);

  if (!validated.success) {
    let errors = validated.error.format();
    errors = helpers.formatFormErrors(errors);

    const state = { success: false, showNotification: false, errors };
    return state;
  }

  let {
    title,
    shortDescription,
    description,
    tags,
    published,
    categories,
    coverPhoto,
  } = validated.data;

  published = Boolean(parseInt(published, 10));
  shortDescription = shortDescription || title;

  const id = postId;
  let post;

  try {
    post = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        authorId: true,
        coverPhoto: true,
      },
    });

    if (!post.authorId) {
      throw new Error("Post not found or invalid ID");
    }

    let coverPhotoPath = null;

    if (coverPhoto) {
      try {
        // Generate unique filename
        const ext = coverPhoto.name.split(".").pop();
        const fileName = `${post.authorId}_PostCoverPhoto_${await randomUUID()}.${ext}`;
        const filePath = path.join(UPLOAD_DIR, fileName);

        // Ensure the upload directory exists
        await fs.mkdir(UPLOAD_DIR, { recursive: true });

        // Read and write file to Docker container
        const buffer = await coverPhoto.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(buffer));

        // Save file path in database
        coverPhotoPath = `/uploads/postCoverPhoto/${fileName}`;
      } catch (uploadError) {
        Logger.error(uploadError, "File Upload Failed");
        return {
          success: false,
          showNotification: true,
          message: "Failed to upload cover photo. Please try again.",
        };
      }
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

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        shortDescription,
        description,
        published,
        coverPhoto:
          coverPhoto !== null
            ? coverPhotoPath
            : post.coverPhoto !== null
              ? post.coverPhoto
              : null,
        categories: {
          set: categories.map((categoryId) => ({
            id: parseInt(categoryId, 10),
          })),
        },
        tags: {
          set: tagRecords.map((tag) => ({ id: tag.id })),
        },
      },
    });

    await redisCacheKey.invalidateCache(redisCacheKey.userPostListings);
    await flashMessage("post update success", "success");
    return { success: true };
  } catch (error) {
    console.log(error);
    // await flashMessage("Failed to update the post", "error");
    if (FormErrorMessage.errorCodeExist(error.code)) {
      return {
        success: false,
        showNotification: false,
        errors: FormErrorMessage.generateMessage(error),
      };
    } else if (PrismaFormError.errorCodeExist(error.code)) {
      return {
        success: false,
        showNotification: true,
        errors: {
          general: PrismaFormError.getPrismaErrorMessage(error),
        },
      };
    } else {
      return {
        success: false,
        showNotification: true,
        errors: { general: "Something went wrong. Please try again." },
      };
    }
  }
  // redirect(`/post/${post.authorId}`);
}
