"use client";

import Button from "@/components/Button";
import { createPost } from "@/repository/actions/posts/create";
import {
  MultiSelect,
  Select,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

export default function PostCreateForm({ authorId, categories }) {
  const [publishStatus, setPublishStatus] = useState();

  return (
    <form
      action={createPost.bind(null, authorId)}
      className="rounded-lg bg-gray-100 px-3 py-6"
    >
      <div className="flex w-full gap-4">
        <TextInput
          className="mb-4 w-1/2"
          name="title"
          label="Title"
          withAsterisk
          size="xs"
          required={true}
          placeholder="Post Title"
        />
        <TextInput
          size="xs"
          className="mb-4 w-1/2"
          label="Short Description"
          name="shortDescription"
          placeholder="Post short description"
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
        />
        <Select
          label="Publish the Post?"
          placeholder="Pick value"
          data={[
            { value: "1", label: "Publish" },
            { value: "0", label: "Don't Publish yet" },
          ]}
          value={publishStatus ? publishStatus.value : null}
          onChange={(_value, option) => setPublishStatus(option)}
          name="published"
          clearable
          allowDeselect
          checkIconPosition="right"
          size="xs"
          required={true}
        />
      </div>
      <div className="ml-auto mt-2 flex w-1/2 gap-4">
        <MultiSelect
          size="xs"
          className="w-full"
          label="Post Categories"
          placeholder="Pick categories"
          data={categories}
          name="categories"
          clearable
          searchable
          hidePickedOptions
          checkIconPosition="right"
          nothingFoundMessage="Nothing found..."
        />
      </div>
      <Button btnClasses="mt-5" type="submit">
        Submit
      </Button>
    </form>
  );
}
