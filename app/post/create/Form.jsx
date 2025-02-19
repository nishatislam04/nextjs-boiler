"use client";

import ImageSvg from "@/components/svg/imageSvg";
import { createPost } from "@/lib/repository/actions/posts/create";
import { createPostSchema } from "@/lib/schema/post/create";
import {
  Box,
  Button,
  FileInput,
  LoadingOverlay,
  MultiSelect,
  Select,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostCreateForm({ authorId, categories }) {
  const [serverErrors, setServerErrors] = useState({});
  const [visible, toggle] = useDisclosure(false);

  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      shortDescription: "",
      description: "",
      tags: [],
      published: "",
      categories: [],
      coverPhoto: null,
    },
    validate: zodResolver(createPostSchema),
  });

  const handleSubmit = async (values) => {
    toggle.open();
    setServerErrors({});

    const response = await createPost(authorId, values);

    if (!response.success && !response.showNotification) {
      await setServerErrors(response.errors);
      toggle.close();
      return;
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
      router.push(`/post?id=${authorId}`);
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
        className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-md"
      >
        <section className="flex w-full gap-4">
          <TextInput
            className="mb-4 w-1/2"
            name="title"
            label="Title"
            required
            size="xs"
            placeholder="Post Title"
            key={form.key("title")}
            {...form.getInputProps("title")}
            error={form.errors.title || serverErrors.title}
          />
          <TextInput
            required
            size="xs"
            className="mb-4 w-1/2"
            label="Short Description"
            name="shortDescription"
            placeholder="Post short description"
            key={form.key("shortDescription")}
            {...form.getInputProps("shortDescription")}
            error={
              form.errors.shortDescription || serverErrors.shortDescription
            }
          />
        </section>
        <section className="flex w-full justify-stretch gap-4">
          <Textarea
            className="w-full"
            label="Description"
            placeholder="Describe your post"
            autosize
            minRows={8}
            maxRows={10}
            name="description"
            key={form.key("description")}
            {...form.getInputProps("description")}
            error={form.errors.description || serverErrors.description}
          />
        </section>
        <section className="mt-2 flex w-full gap-4">
          <TagsInput
            size="xs"
            clearable
            acceptValueOnBlur
            splitChars={[",", " ", "|"]}
            label="Press Enter to submit a tag for this post"
            placeholder="Enter tag"
            className="w-3/12"
            name="tags"
            key={form.key("tags")}
            {...form.getInputProps("tags")}
            error={form.errors.tags || serverErrors.tags}
          />

          <MultiSelect
            className="w-3/12"
            size="xs"
            label="Post Categories"
            placeholder="Pick categories"
            name="categories"
            clearable
            searchable
            hidePickedOptions
            checkIconPosition="right"
            nothingFoundMessage="Nothing found..."
            key={form.key("categories")}
            {...form.getInputProps("categories")}
            data={categories}
            error={form.errors.categories || serverErrors.categories}
          />

          <Select
            className="w-3/12"
            label="Publish the Post?"
            placeholder="Pick value"
            name="published"
            clearable
            allowDeselect
            checkIconPosition="right"
            size="xs"
            required={true}
            {...form.getInputProps("published")}
            key={form.key("published")}
            error={form.errors.published || serverErrors.published}
            data={[
              { value: "1", label: "Publish" },
              { value: "0", label: "Don't Publish yet" },
            ]}
          />

          <FileInput
            name="coverPhoto"
            className="w-3/12"
            size="xs"
            clearable
            leftSection={<ImageSvg />}
            label="Post Cover Picture"
            accept="image/png,image/jpeg,image/jpg"
            placeholder="Upload Post cover picture"
            onChange={(file) => form.setFieldValue("coverPhoto", file)}
            error={form.errors.coverPhoto}
          />
        </section>

        <Button
          loading={visible}
          color="indigo"
          type="submit"
          variant="filled"
          radius="sm"
          className="!mt-3"
          size="xs"
        >
          Create
        </Button>
      </form>
    </Box>
  );
}
