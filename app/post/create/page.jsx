import Button from "@/components/Button";
import Form from "@/components/Form";
import GoBack from "@/components/GoBack";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";

import { createPost } from "@/actions/posts/create";
import FormSelect from "@/components/FormSelect";
import {
  MultiSelect,
  NativeSelect,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";

export default async function PostCreatePage({ searchParams }) {
  const authorId = (await searchParams).authorId;

  return (
    <div className="max-w-screen-xl mx-auto p-4 mt-12 relative">
      <div className="relative">
        <GoBack />

        <h1 className="mb-5 text-2xl font-bold ">Create Post</h1>

        <Form action={createPost.bind(null, authorId)}>
          <div className="flex gap-4 w-full">
            {/* <InputText
              label="Title"
              name="title"
              required={true}
              placeholder="Enter Post Title"
            /> */}
            <TextInput
              className="mb-4 w-1/2"
              name="title"
              label="Title"
              withAsterisk
              size="xs"
              required={true}
              placeholder="Post Title"
            />
            {/* <InputText
              label="Short Description"
              name="shortDescription"
              placeholder="Enter Post short description"
              helperMessage="You can ignore ths field for later"
            /> */}
            <TextInput
              size="xs"
              className="mb-4 w-1/2"
              label="Short Description"
              name="shortDescription"
              placeholder="Post short description"
            />
          </div>
          <div className="flex justify-stretch gap-4 w-full">
            {/* <TextArea
              label="Description"
              name="description"
              row="4"
              placeholder="Enter Your Post Long Description"
              classes="w-full"
              helperMessage="You can ignore ths field for later"
            /> */}
            <Textarea
              className="w-full"
              label="Description"
              placeholder="Describe your post"
              autosize
              minRows={2}
              maxRows={4}
            />
          </div>

          {/* <FormSelect
							name="published"
							label="Publish the post?"
							value="0">
							<option>Publish the post?</option>
							<option value="1">Publish</option>
							<option value="0">Don&apos;t publish yet</option>
						</FormSelect> */}
          <div className="flex gap-4 w-full mt-2">
            <MultiSelect
              size="xs"
              className="w-full"
              label="Post Category"
              placeholder="Pick categories"
              data={["React", "Angular", "Vue", "Svelte"]}
              clearable
              searchable
              hidePickedOptions
              checkIconPosition="right"
              nothingFoundMessage="Nothing found..."
            />
            <NativeSelect
              name="published"
              className="w-full"
              size="xs"
              label="Publish"
              data={[
                { label: "Publish", value: "1" },
                { label: "Don't Publish Yet", value: "0" },
              ]}
            />
          </div>
          <div className="flex gap-4 w-full mt-2">
            <TagsInput
              size="xs"
              clearable
              acceptValueOnBlur
              splitChars={[",", " ", "|"]}
              label="Press Enter to submit a tag for this post"
              placeholder="Enter tag"
            />
          </div>
          <Button btnClasses="mt-5" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
