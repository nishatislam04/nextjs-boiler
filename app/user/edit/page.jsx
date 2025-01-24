import { updateUser } from "@/repository/actions/users/update";
import Button from "@/components/Button";
import Form from "@/components/Form";
import GoBack from "@/components/GoBack";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import prisma from "@/lib/db";
import EditUserForm from "./Form";
import { fetchUser } from "@/repository/user/dal";

export default async function UserEditPage({ searchParams }) {
  const params = await searchParams;
  const id = params.id || "";
  // if (!id) return notFound();

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: id,
  //   },
  //   include: {
  //     profile: true,
  //   },
  // });

  // if (!user) return notFound();
  const user = await fetchUser(id);

  return (
    <div className="relative mx-auto mt-12 max-w-screen-xl p-4">
      <div className="relative">
        <GoBack />
        <h1 className="mb-5 text-2xl font-bold">Edit User</h1>

        <EditUserForm user={user} authorId={id} />
      </div>
    </div>
  );
}
