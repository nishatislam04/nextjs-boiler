"use server";

import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";
import helpers from "@/lib/helpers";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { updateUserSchema } from "@/lib/schema/user/update";
import FormErrorMessage from "@/lib/formErrorMessage";
import PrismaFormError from "@/lib/prismaValidationError";
import { promises as fs } from "fs";
import path from "path";
import redisCacheKey from "@/lib/redisCacheKey";
import { randomUUID } from "crypto";

const isProduction = process.env.NODE_ENV === "production";
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/profilePictures/"); // Local Docker directory

export async function updateUser(userId, formData) {
  const validated = updateUserSchema.safeParse(formData);

  if (!validated.success) {
    let errors = validated.error.format();
    errors = helpers.formatFormErrors(errors);
    return { success: false, showNotification: false, errors };
  }

  let { username, name, email, bio, website, location, image } = validated.data;
  let imagePath = null;

  try {
    // ✅ Handle image upload if provided
    if (image) {
      const ext = image.name.split(".").pop();
      const fileName = `${username}_profilePicture_${await randomUUID()}.${ext}`;

      if (isProduction) {
        // 🟢 **Production: Upload to Vercel Blob Storage**
        const buffer = Buffer.from(await image.arrayBuffer());
        const { url } = await put(`profilePictures/${fileName}`, buffer, {
          access: "public",
        });

        imagePath = url; // Store Vercel Blob URL
      } else {
        // 🟡 **Local Development: Store in 'public/uploads/profilePictures/'**
        const filePath = path.join(UPLOAD_DIR, fileName);

        await fs.mkdir(UPLOAD_DIR, { recursive: true }); // Ensure directory exists
        const buffer = Buffer.from(await image.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        imagePath = `/uploads/profilePictures/${fileName}`; // Relative path
      }
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        username,
        ...(imagePath && { image: imagePath }), // Only update image if provided
        profile: {
          update: {
            where: { userId },
            data: {
              bio: bio || null,
              website: website || null,
              location: location || null,
            },
          },
        },
      },
    });

    await redisCacheKey.invalidateCache(redisCacheKey.userListings);
    await redisCacheKey.invalidateCache(redisCacheKey.userProfilePage);
    await flashMessage("User updated successfully!", "success");

    return { success: true };
  } catch (error) {
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
      console.log("user update failed", error);
      return {
        success: false,
        showNotification: true,
        errors: { general: "Something went wrong. Please try again." },
      };
    }
  }
}
