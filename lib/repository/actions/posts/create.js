"use server";

import helpers from "@/lib/helpers";
import prisma from "@/lib/prisma";
import PrismaFormError from "@/lib/prismaValidationError";
import { createPostSchema } from "@/lib/schema/post/create";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import Logger from "@/lib/logger";
import FormErrorMessage from "@/lib/formErrorMessage";
import redisCacheKey from "@/lib/redisCacheKey";

const UPLOAD_DIR = "/app/public/uploads/postCoverPhoto/"; // Directory inside Docker container

export async function createPost(authorId, formData) {
  const validated = createPostSchema.safeParse(formData);

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
  const slug = convertToSlug(title);
  categories = categories.map((category) => {
    return { id: parseInt(category) };
  });
  let coverPhotoPath = null;

  // ✅ Handle optional cover photo
  if (coverPhoto) {
    try {
      // Generate unique filename
      const ext = coverPhoto.name.split(".").pop();
      const fileName = `${authorId}_PostCoverPhoto_${await Bun.randomUUIDv7()}.${ext}`;
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

  try {
    await prisma.post.create({
      data: {
        title,
        shortDescription,
        description,
        published,
        slug,
        authorId,
        coverPhoto: coverPhotoPath, // ✅ If no file, this stays `null`
        categories: {
          connect: categories,
        },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });

    await redisCacheKey.invalidateCache(redisCacheKey.userPostListings);
    await flashMessage("Post created successfully", "success");

    return { success: true };
  } catch (error) {
    console.log(error);
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

function convertToSlug(title) {
  if (!title || typeof title !== "string") {
    throw new Error("Input must be a non-empty string");
  }

  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[\s_]+/g, "-") // Replace spaces or underscores with a single dash
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except dashes
    .replace(/--+/g, "-") // Replace multiple dashes with a single dash
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing dashes
}
