import GoBack from "@/components/ui/GoBack";
import Image from "next/image";
import UserShowForm from "./Form";
import { AspectRatio } from "@mantine/core";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";
import { fetchUserProfile } from "@/lib/repository/user/dal";
import Logger from "@/lib/logger";

/**
 * USER PROFILE PAGE
 *
 * @param param0
 */
export default async function ProfilePage({ params }) {
  const id = (await params).id;
  const authUser = await checkAuthAndRoles(`/user/show/${id}`);
  if (React.isValidElement(authUser)) return authUser;

  const user = await fetchUserProfile(id);

  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-var(--nav-height))] max-w-screen-xl items-center">
      {/* go back */}
      <section className="absolute top-0 right-0">
        <GoBack />
      </section>

      <section className="grid items-center w-full h-full grid-cols-10 mb-4 border border-gray-200 rounded-lg shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {/* profile picture */}
        <section className="relative flex items-center justify-center h-full col-span-4">
          <AspectRatio ratio={1080 / 720} maw={200} className="w-full">
            <Image
              src={
                user.image ||
                "https://placehold.co/600x400?text=Default+Profile+Picture"
              }
              alt="User Avatar"
              className="object-cover rounded-lg"
              fill
            />
          </AspectRatio>
        </section>

        <section className="col-span-6 p-6">
          <UserShowForm user={user} />
        </section>
      </section>
    </main>
  );
}
