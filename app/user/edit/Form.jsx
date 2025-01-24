import Button from "@/components/Button";
import { updateUser } from "@/repository/actions/users/update";
import { Textarea, TextInput } from "@mantine/core";

export default function EditUserForm({ user, authorId }) {
  return (
    <form
      action={updateUser.bind(null, authorId)}
      className="rounded-lg bg-gray-100 px-3 py-6"
    >
      <div className="flex w-full gap-4">
        <TextInput
          className="mb-4 w-1/2"
          label="Name"
          size="xs"
          name="name"
          placeholder="Post Title"
          defaultValue={user.name}
        />
        <TextInput
          className="mb-4 w-1/2"
          label="Email Address"
          size="xs"
          name="email"
          placeholder="Post Title"
          defaultValue={user.email}
        />
      </div>
      <div className="flex w-full gap-4">
        <TextInput
          className="mb-4 w-1/2"
          label="Userame"
          size="xs"
          name="username"
          placeholder="Post Title"
          defaultValue={user.username}
        />
        <TextInput
          className="mb-4 w-1/2"
          label="Website Link"
          size="xs"
          name="website"
          placeholder="Post Title"
          defaultValue={user.profile?.website || ""}
        />
      </div>
      <Textarea
        className="w-full"
        label="Bio"
        placeholder="User Bio"
        autosize
        minRows={2}
        maxRows={4}
        name="bio"
        defaultValue={user.profile?.bio || ""}
      />
      <div className="flex w-full gap-4">
        <TextInput
          className="mb-4 w-1/2"
          label="User Location"
          size="xs"
          name="location"
          placeholder="Post Title"
          defaultValue={user.profile?.location}
        />
      </div>
      <Button btnClasses="mt-5" type="submit">
        Update
      </Button>
    </form>
  );
}
