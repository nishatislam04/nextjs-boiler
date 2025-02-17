import GoBack from "@/components/ui/GoBack";
import UserShowForm from "./Form";
import { fetchUserProfile } from "@/lib/repository/user/dal";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";
import Logger from "@/lib/logger";

export default async function UserShowPage({ searchParams }) {
  const authUser = await checkAuthAndRoles("/dashboard/user/showPage");
  if (React.isValidElement(authUser)) return authUser;

  const params = await searchParams;
  const id = params.id || "";
  const user = await fetchUserProfile(id);

  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-var(--nav-height))] max-w-screen-xl items-center">
      {/* go back */}
      <section className="absolute right-0 top-0">
        <GoBack />
      </section>

      <section className="h-full w-full">
        <h1 className="mb-2 text-2xl font-bold">Show User</h1>

        <UserShowForm user={user} />
      </section>
    </main>
  );
}
