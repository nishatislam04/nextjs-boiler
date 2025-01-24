"use server";

import prisma from "@/lib/db";
import { flashMessage } from "@thewebartisan7/next-flash-message";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteUser(userId, formData) {
  const id = userId;
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    console.log("User deleted successfully:", userId);
    revalidatePath("/user");
    return {
      status: "success",
      message: "User Delete Success",
    };
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return {
      status: "error",
      message: "Failed to delete the user.",
    };
  }
  // const id = userId;

  // await prisma.user.delete({
  // 	where: {
  // 		id,
  // 	},
  // });

  // console.log("xxxx", id, "user delete success");
  // // await flashMessage("user delete success");
  // revalidatePath("/user");
  // redirect("/user");
}
