import GoBack from "@/components/ui/GoBack";
import CreateUserForm from "./Form";
import { fetchAllRoles } from "@/lib/repository/roles/dal";
import Logger from "@/lib/logger";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";

export default async function UserCreatePage() {
  const authUser = await checkAuthAndRoles("/dashboard/user/createPage");
  if (React.isValidElement(authUser)) return authUser;

  let roles = await fetchAllRoles();
  roles = roles.map((role) => {
    return { value: String(role.id), label: role.name };
  });
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-var(--nav-height))] max-w-screen-xl flex-col items-stretch justify-center">
      {/* go back */}
      <section className="absolute right-0 top-0">
        <GoBack />
      </section>

      <section className="">
        <h1 className="mb-2 text-2xl font-bold">Create User</h1>

        <CreateUserForm roles={roles} />
      </section>
    </main>
  );
}
