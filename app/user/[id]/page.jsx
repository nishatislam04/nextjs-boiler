import GoBack from "@/components/ui/GoBack";
import Image from "next/image";
import UserShowForm from "./Form";
import { Anchor, AspectRatio, Button } from "@mantine/core";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";
import { fetchUserProfile } from "@/lib/repository/user/dal";
import Logger from "@/lib/logger";
import Link from "next/link";
import AddSvg from "@/components/svg/Add";
import Toast from "@/components/ui/Toast";

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
    <main className="relative mx-auto flex min-h-[calc(100vh-var(--nav-height))] max-w-screen-xl flex-col items-center gap-3">
      <Toast />

      {/* go back */}
      <section className="absolute right-0 top-0">
        <GoBack />
      </section>

      {/* edit page */}
      <section className="ml-auto mt-12">
        <Button
          size="xs"
          variant="filled"
          color="orange"
          component={Link}
          href={`/user/edit?id=${user.id}`}
          prefetch
        >
          <AddSvg />
          Edit Profile Info
        </Button>
      </section>

      <section className="mb-4 grid h-full w-full grid-cols-10 items-center rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {/* profile picture */}
        <section className="relative col-span-4 flex h-full items-center justify-center">
          <AspectRatio ratio={1080 / 720} maw={200} className="w-full">
            <Image
              src={
                user.image ||
                "https://placehold.co/600x400?text=Default+Profile+Picture"
              }
              alt="User Avatar"
              className="rounded-lg object-cover"
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
