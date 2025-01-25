"use server";

import prisma from "@/lib/db";
import { invalidateUserCache } from "@/lib/helpers";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// this is handled by modal. so flash message is not integrated
export async function deleteUser(userId, formData) {
  const id = userId;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    await invalidateUserCache("users:listings:*");
    revalidatePath("/user");
    return {
      status: "success",
      message: "User Delete Success",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to delete the user.",
    };
  }
}
