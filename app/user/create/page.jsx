import { createUser } from "@/repository/actions/users/create";
import Button from "@/components/Button";
import Form from "@/components/Form";
import GoBack from "@/components/GoBack";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import CreateUserForm from "./Form";

export default function UserCreatePage() {
  return (
    <div className="relative mx-auto mt-12 max-w-screen-xl p-4">
      <div className="relative">
        <GoBack />

        <h1 className="mb-5 text-2xl font-bold">Create User</h1>

        <CreateUserForm />
      </div>
    </div>
  );
}
