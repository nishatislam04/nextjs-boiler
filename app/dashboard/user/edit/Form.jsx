"use client";
import ImageSvg from "@/components/svg/imageSvg";
import { updateUser } from "@/lib/repository/actions/users/update";
import { updateUserSchema } from "@/lib/schema/user/update";
import {
  Box,
  Button,
  FileInput,
  LoadingOverlay,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditUserForm({ user, authorId, roles }) {
  const [serverErrors, setServerErrors] = useState({});
  const [visible, toggle] = useDisclosure(false);

  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.profile?.bio,
      website: user.profile?.website,
      location: user.profile?.location,
      image: null,
    },
    validate: zodResolver(updateUserSchema),
  });

  const handleSubmit = async (values) => {
    toggle.open();
    setServerErrors({});

    const response = await updateUser(authorId, values);

    if (!response.success && !response.showNotification) {
      await setServerErrors(response.errors);
      toggle.close();
    } else if (!response.success && response.showNotification) {
      notifications.show({
        title: "Error",
        message: response.errors.general,
        position: "top-right",
        color: "red",
        radius: "md",
        autoClose: 5000,
      });
      setServerErrors({});
      toggle.close();
    } else {
      router.push("/dashboard/user");
      toggle.close();
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={10000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="px-6 py-4 bg-white border border-gray-200 shadow-md rounded-2xl"
      >
        <section className="flex w-full gap-4">
          <TextInput
            className="w-1/2 mb-4"
            label="Name"
            size="xs"
            name="name"
            placeholder="user name"
            defaultValue={user.name}
            key={form.key("name")}
            {...form.getInputProps("name")}
            error={form.errors.name || serverErrors.name}
          />
          <TextInput
            className="w-1/2 mb-4"
            label="Email Address"
            size="xs"
            name="email"
            placeholder="user email"
            defaultValue={user.email}
            key={form.key("email")}
            {...form.getInputProps("email")}
            error={form.errors.email || serverErrors.email}
          />
        </section>
        <section className="flex w-full gap-4">
          <TextInput
            className="w-1/2 mb-4"
            label="Username"
            size="xs"
            name="username"
            placeholder="username"
            defaultValue={user.username}
            key={form.key("username")}
            {...form.getInputProps("username")}
            error={form.errors.username || serverErrors.username}
          />
          <TextInput
            className="w-1/2 mb-4"
            label="Website Link"
            size="xs"
            name="website"
            placeholder="website"
            defaultValue={user.profile?.website || ""}
            key={form.key("website")}
            {...form.getInputProps("website")}
            error={form.errors.website || serverErrors.website}
          />
          <TextInput
            className="w-1/2"
            label="User Location"
            size="xs"
            name="location"
            placeholder="user location"
            defaultValue={user.profile?.location}
            key={form.key("location")}
            {...form.getInputProps("location")}
            error={form.errors.location || serverErrors.location}
          />
        </section>
        <Textarea
          className="w-full"
          label="Bio"
          placeholder="User Bio"
          autosize
          minRows={2}
          maxRows={4}
          name="bio"
          defaultValue={user.profile?.bio || ""}
          key={form.key("bio")}
          {...form.getInputProps("bio")}
          error={form.errors.bio || serverErrors.bio}
        />
        <section className="flex w-full gap-4">
          <FileInput
            name="image"
            className="mt-2 w-[30rem]"
            size="xs"
            clearable
            description={
              user.image
                ? "you have already setup your profile picture. choose a new one to update the existing picture"
                : "you still did not setup your profile picture. choose a picture to setup your profile picture"
            }
            leftSection={<ImageSvg />}
            label="Profile Picture"
            accept="image/png,image/jpeg,image/jpg"
            placeholder="Upload profile picture"
            onChange={(file) => form.setFieldValue("image", file)}
            error={form.errors.image}
          />
        </section>
        <Button
          className="!mt-6"
          loading={visible}
          color="orange"
          variant="filled"
          size="xs"
          radius="md"
          type="submit"
        >
          Update
        </Button>
      </form>
    </Box>
  );
}
