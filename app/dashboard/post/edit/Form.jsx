"use client";

import ImageSvg from "@/components/svg/imageSvg";
import { updatePost } from "@/lib/repository/actions/posts/update";
import { updatePostSchema } from "@/lib/schema/post/update";
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
import { useEffect, useState } from "react";

export default function PostEditPage({ post, categories, authorId }) {
  const [serverErrors, setServerErrors] = useState({});
  const [visible, toggle] = useDisclosure(false);
  const [publishStatus, setPublishStatus] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(
    post.categories.map((category) => category.value),
  );
  const [selectedTags, setSelectedTags] = useState(
    post.tags.map((tag) => tag.label),
  );

  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: post.title,
      shortDescription: post.shortDescription,
      description: post.description,
      tags: selectedTags,
      published: post.published ? "1" : "0",
      categories: selectedCategories,
      coverPhoto: null,
    },
    validate: zodResolver(updatePostSchema),
  });

  const handleSubmit = async (values) => {
    toggle.open();
    setServerErrors({});

    const response = await updatePost(authorId, values);

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
      router.push(`/dashboard/post/${authorId}`);
      toggle.close();
    }
  };

  useEffect(() => {
    return post.published
      ? setPublishStatus({ value: "1", label: "Publish" })
      : setPublishStatus({ value: "0", label: "Don't published yet" });
  }, [post.published]);

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={10000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="rounded-lg bg-gray-100 px-3 py-6"
      >
        {/* <Toast /> */}
        <div className="flex w-full gap-4">
          <TextInput
            className="mb-4 w-1/2"
            name="title"
            label="Title"
            withAsterisk
            size="xs"
            required={true}
            placeholder="Post Title"
            key={form.key("title")}
            {...form.getInputProps("title")}
            error={form.errors.title || serverErrors.title}
            defaultValue={post.title}
          />
          <TextInput
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
            defaultValue={post.shortDescription}
          />
        </div>
        <div className="flex w-full justify-stretch gap-4">
          <Textarea
            className="w-full"
            label="Description"
            placeholder="Describe your post"
            autosize
            minRows={2}
            maxRows={4}
            name="description"
            key={form.key("description")}
            {...form.getInputProps("description")}
            error={form.errors.description || serverErrors.description}
            defaultValue={post.description}
          />
        </div>

        <div className="mt-2 flex w-full gap-4">
          <TagsInput
            size="xs"
            clearable
            acceptValueOnBlur
            splitChars={[",", " ", "|"]}
            label="Press Enter to submit a tag for this post"
            placeholder="Enter tag"
            className="w-full"
            name="tags"
            key={form.key("tags")}
            {...form.getInputProps("tags")}
            error={form.errors.tags || serverErrors.tags}
            value={selectedTags}
            onChange={(value) => {
              setSelectedTags(value);
              form.setValues({ tags: value });
            }}
          />
          <Select
            label="Publish the Post?"
            placeholder="Pick value"
            data={[
              { value: "1", label: "Publish" },
              { value: "0", label: "Don't Publish yet" },
            ]}
            name="published"
            clearable
            allowDeselect
            checkIconPosition="right"
            size="xs"
            required={true}
            key={form.key("published")}
            {...form.getInputProps("published")}
            error={form.errors.published || serverErrors.published}
            value={publishStatus ? publishStatus.value : null}
            onChange={(_value, option) => {
              setPublishStatus(option);
              form.setValues({ published: option.value });
            }}
          />
        </div>
        <div className="ml-auto mt-2 flex w-full gap-4">
          <FileInput
            name="coverPhoto"
            className="w-[30rem]"
            size="xs"
            clearable
            description={
              post.coverPhoto
                ? "you have already used cover picture for this post. choose a new one to update"
                : "you still did not use a cover photo. choose a picture to setup cover photo"
            }
            leftSection={<ImageSvg />}
            label="Cover Photo"
            accept="image/png,image/jpeg,image/jpg"
            placeholder="Upload post cover photo"
            onChange={(file) => form.setFieldValue("coverPhoto", file)}
            error={form.errors.image}
          />

          <MultiSelect
            size="xs"
            className="ml-auto mt-2 w-1/2"
            label="Post Categories"
            placeholder="Pick categories"
            data={categories}
            name="categories"
            clearable
            searchable
            hidePickedOptions
            checkIconPosition="right"
            nothingFoundMessage="Nothing found..."
            key={form.key("categories")}
            {...form.getInputProps("categories")}
            error={form.errors.categories || serverErrors.categories}
            value={selectedCategories}
            onChange={(value) => {
              setSelectedCategories(value);
              form.setValues({ categories: value });
            }}
          />
        </div>
        <Button
          className="mt-4"
          loading={visible}
          color="orange"
          variant="filled"
          radius="sm"
          size="xs"
          type="submit"
        >
          Update
        </Button>
      </form>
    </Box>
  );
}
