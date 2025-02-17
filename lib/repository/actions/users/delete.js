"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import redisCacheKey from "@/lib/redisCacheKey";

export async function deleteUser(userId) {
  const id = userId;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    await redisCacheKey.invalidateCache(redisCacheKey.userListings);
    revalidatePath("/dashboard/user");
    return {
      status: "success",
      showNotification: true,
      message: "user delete success.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      showNotification: true,
      errors: { general: "user delete fail" },
    };
  }
}
