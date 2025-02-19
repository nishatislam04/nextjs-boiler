import GoBack from "@/components/ui/GoBack";
import EditUserForm from "./Form";
import { fetchUser } from "@/lib/repository/user/dal";
import { fetchAllRoles } from "@/lib/repository/roles/dal";
import { checkAuthAndRoles } from "@/lib/authHelper";
import React from "react";
import Logger from "@/lib/logger";
import sessionHelper from "@/lib/sessionHelper";
import { forbidden } from "next/navigation";

export default async function UserEditPage({ searchParams }) {
  const authUser = await checkAuthAndRoles("/user/editPage");
  if (React.isValidElement(authUser)) return authUser;

  const params = await searchParams;
  const id = params.id || "";
  const user = await fetchUser(id);

  const session = await sessionHelper.getUserSession();
  // only owner can edit their profile info
  if (session.userId !== user.id) return forbidden();

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
        <h1 className="mb-2 text-2xl font-bold">Edit User</h1>
        <EditUserForm user={user} authorId={id} roles={roles} />
      </section>
    </main>
  );
}
