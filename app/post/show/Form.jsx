import { Textarea, TextInput } from "@mantine/core";

export default function ShowPostForm({ post }) {
  return (
    <form className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-md">
      <div className="flex w-full gap-4">
        <TextInput
          className="mb-4 w-1/2"
          label="Title"
          size="xs"
          placeholder="Post Title"
          defaultValue={post.title}
          disabled
        />
        <TextInput
          size="xs"
          className="mb-4 w-1/2"
          label="Short Description"
          placeholder="Post short description"
          defaultValue={post.shortDescription}
          disabled
        />
      </div>
      <div className="flex w-full justify-stretch gap-4">
        <Textarea
          className="w-full"
          label="Description"
          placeholder="Describe your post"
          autosize
          minRows={10}
          maxRows={12}
          defaultValue={post.description || ""}
          disabled
        />
      </div>

      <div className="mt-2 flex w-full gap-4">
        <TextInput
          className="mb-4 w-3/12"
          label="Tags"
          size="xs"
          placeholder="Post Title"
          defaultValue={post.tags.map((tag) => tag.label).join(", ") || ""}
          disabled
        />
        <TextInput
          className="mb-4 w-3/12"
          label="Published Status"
          size="xs"
          placeholder="Post Title"
          defaultValue={
            post.published ? "published" : "still not published yet"
          }
          disabled
        />

        <TextInput
          className="mb-4 w-3/12"
          label="Created Date"
          size="xs"
          placeholder="Post Title"
          defaultValue={post.createdAt}
          disabled
        />
        <TextInput
          className="mb-4 w-3/12"
          label="Categories"
          size="xs"
          placeholder="Post Title"
          defaultValue={
            post.categories.map((category) => category.label).join(", ") || ""
          }
          disabled
        />
      </div>
      {/* <div className="mt-2 flex w-full gap-4"></div> */}
    </form>
  );
}
