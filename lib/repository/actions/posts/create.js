"use server";

import helpers from "@/lib/helpers";
import prisma from "@/lib/prisma";
import PrismaFormError from "@/lib/prismaValidationError";
import { updatePostSchema } from "@/lib/schema/post/update";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { promises as fs } from "fs";
import path from "path";
import Logger from "@/lib/logger";
import FormErrorMessage from "@/lib/formErrorMessage";
import redisCacheKey from "@/lib/redisCacheKey";
import { randomUUID } from "crypto";
import { put } from "@vercel/blob";

const isProduction = process.env.NODE_ENV === "production";
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/postCoverPhoto/");

export async function updatePost(postId, formData) {
  const validated = updatePostSchema.safeParse(formData);

  if (!validated.success) {
    let errors = validated.error.format();
    errors = helpers.formatFormErrors(errors);
    return { success: false, showNotification: false, errors };
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

  try {
    // Fetch existing post
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true, coverPhoto: true },
    });

    if (!existingPost) {
      return {
        success: false,
        showNotification: true,
        message: "Post not found.",
      };
    }

    let coverPhotoPath = existingPost.coverPhoto; // Preserve old photo by default

    // ✅ **Handle optional cover photo update**
    if (coverPhoto) {
      try {
        const ext = coverPhoto.name.split(".").pop();
        const fileName = `${existingPost.authorId}_PostCoverPhoto_${await randomUUID()}.${ext}`;

        if (isProduction) {
          // 🟢 **Production: Upload to Vercel Blob Storage**
          const buffer = Buffer.from(await coverPhoto.arrayBuffer());
          const { url } = await put(`PostCoverPhoto/${fileName}`, buffer, {
            access: "public",
          });

          coverPhotoPath = url;
        } else {
          const filePath = path.join(UPLOAD_DIR, fileName);

          // Ensure the directory exists
          await fs.mkdir(UPLOAD_DIR, { recursive: true });

          // Save file locally
          const buffer = await coverPhoto.arrayBuffer();
          await fs.writeFile(filePath, Buffer.from(buffer));

          coverPhotoPath = `/uploads/postCoverPhoto/${fileName}`;
        }
      } catch (uploadError) {
        Logger.error(uploadError, "File Upload Failed");
        return {
          success: false,
          showNotification: true,
          message: "Failed to upload cover photo. Please try again.",
        };
      }
    }

    // ✅ **Prepare category & tag updates**
    categories = categories.map((category) => ({ id: parseInt(category) }));

    // Handle tags - `connectOrCreate` ensures non-existing tags are created
    const tagConnections = tags.map((tag) => ({
      where: { name: tag },
      create: { name: tag },
    }));

    // ✅ **Update post in the database**
    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        shortDescription,
        description,
        published,
        coverPhoto: coverPhotoPath,
        categories: { set: categories },
        tags: { connectOrCreate: tagConnections },
      },
    });

    await redisCacheKey.invalidateCache(redisCacheKey.userPostListings);
    await flashMessage("Post updated successfully", "success");

    return { success: true };
  } catch (error) {
    console.error(error);

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
        errors: { general: PrismaFormError.getPrismaErrorMessage(error) },
      };
    } else {
      return {
        success: false,
        showNotification: true,
        errors: { general: "Something went wrong. Please try again." },
      };
    }
  }
}
