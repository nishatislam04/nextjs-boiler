"use client";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { createUser } from "@/lib/repository/actions/users/create";
import {
  Box,
  Button,
  FileInput,
  LoadingOverlay,
  MultiSelect,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLock } from "@tabler/icons-react";
import { createUserSchema } from "@/lib/schema/user/create";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import ImageSvg from "@/components/svg/imageSvg";

export default function CreateUserForm({ roles }) {
  const [serverErrors, setServerErrors] = useState({});
  const [visible, toggle] = useDisclosure(false);
  const passwordIcon = <IconLock size={18} stroke={1.5} />;
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      image: null,
      roles: roles.some((role) => role.label === "member")
        ? [roles.find((role) => role.label === "member")?.value]
        : [],
    },
    validate: zodResolver(createUserSchema),
  });

  const handleSubmit = async (values) => {
    toggle.open();
    setServerErrors({});

    const response = await createUser(values);

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
            required
            className="w-1/2 mb-4"
            label="Name"
            size="xs"
            name="name"
            placeholder="Name"
            key={form.key("name")}
            {...form.getInputProps("name")}
            error={form.errors.name || serverErrors.name}
          />
          <TextInput
            required
            className="w-1/2 mb-4"
            label="Email Address"
            size="xs"
            name="email"
            placeholder="Email Address"
            key={form.key("email")}
            {...form.getInputProps("email")}
            error={form.errors.email || serverErrors.email}
          />
        </section>
        <section className="flex w-full gap-4">
          <TextInput
            required
            className="w-1/2 mb-4"
            label="Userame"
            size="xs"
            name="username"
            placeholder="Username"
            key={form.key("username")}
            {...form.getInputProps("username")}
            error={form.errors.username || serverErrors.username}
          />
          <PasswordInput
            // todo: make the password visibility working
            required
            className="w-1/2 mb-4"
            leftSection={passwordIcon}
            label="password"
            size="xs"
            placeholder="Password"
            // visible={visible}
            // onVisibilityChange={toggle}
            name="password"
            key={form.key("password")}
            {...form.getInputProps("password")}
            error={form.errors.password || serverErrors.password}
          />
        </section>

        <section className="flex w-full gap-4 mb-4">
          <FileInput
            name="image"
            className="w-80"
            size="xs"
            clearable
            leftSection={<ImageSvg />}
            label="Profile Picture"
            accept="image/png,image/jpeg,image/jpg"
            placeholder="Upload profile picture"
            onChange={(file) => form.setFieldValue("image", file)}
            error={form.errors.image}
          />

          <MultiSelect
            size="xs"
            className="ml-auto w-60"
            label="Roles"
            placeholder="Pick Roles"
            name="roles"
            clearable
            hidePickedOptions
            checkIconPosition="right"
            key={form.key("roles")}
            {...form.getInputProps("roles")}
            data={roles}
            error={form.errors.roles || serverErrors.roles}
          />
        </section>

        <Button
          className="!mt-6"
          loading={visible}
          variant="filled"
          size="xs"
          radius="md"
          type="submit"
        >
          Create
        </Button>
      </form>
    </Box>
  );
}
