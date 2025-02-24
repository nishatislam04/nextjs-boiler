"use server";

import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import helpers from "@/lib/helpers";
import { createUserSchema } from "@/lib/schema/user/create";
import { promises as fs } from "fs";
import path from "path";
import FormErrorMessage from "@/lib/formErrorMessage";
import PrismaFormError from "@/lib/prismaValidationError";
import redisCacheKey from "@/lib/redisCacheKey";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

const isProduction = process.env.NODE_ENV === "production";

// Set upload directory for local development
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/profilePictures/");

export async function createUser(formData) {
  const validated = createUserSchema.safeParse(formData);

  if (!validated.success) {
    let errors = validated.error.format();
    errors = helpers.formatFormErrors(errors);
    return { success: false, showNotification: false, errors };
  }

  let { username, name, email, password, image, roles } = validated.data;

  const type = "credentials";
  const provider = "credentials";
  const providerAccountId = randomUUID();
  const access_token = randomUUID();
  let imagePath = null;

  try {
    // ✅ Handle image upload only if provided
    if (image) {
      const ext = image.name.split(".").pop();
      const fileName = `${username}_profilePicture_${await randomUUID()}.${ext}`;

      if (isProduction) {
        // 🟢 **Production: Upload to Vercel Blob Storage**
        const buffer = Buffer.from(await image.arrayBuffer());
        const { url } = await put(`profilePictures/${fileName}`, buffer, {
          access: "public",
        });

        imagePath = url; // Store the public Vercel Blob URL
      } else {
        // 🟡 **Local Development: Store in 'public/uploads/profilePictures/'**
        const filePath = path.join(UPLOAD_DIR, fileName);

        // Ensure the upload directory exists
        await fs.mkdir(UPLOAD_DIR, { recursive: true });

        // Read and write file locally
        const buffer = Buffer.from(await image.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        imagePath = `/uploads/profilePictures/${fileName}`; // Relative path
      }
    }

    password = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password,
        name,
        email,
        roles: {
          connect: roles?.map((role) => ({ id: role })) || [],
        },
        image: imagePath,
        account: {
          create: {
            type,
            provider,
            providerAccountId,
            access_token,
          },
        },
      },
    });

    await redisCacheKey.invalidateCache(redisCacheKey.userListings);
    await flashMessage("User created successfully!", "success");

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
      console.log("user creation fail1", error);
      console.log("user creation fail2", { error });
      return {
        success: false,
        showNotification: true,
        errors: { general: "Something went wrong. Please try again." },
      };
    }
  }
}
