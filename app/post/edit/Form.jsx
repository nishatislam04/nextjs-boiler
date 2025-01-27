"use client";

import Button from "@/components/Button";
import { updatePost } from "@/repository/actions/posts/update";
import {
	MultiSelect,
	Select,
	TagsInput,
	Textarea,
	TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";

export default function PostEditPage({ post, categories, authorId }) {
	const [publishStatus, setPublishStatus] = useState();
	const [selectedCategories, setSelectedCategories] = useState(
		post.categories.map((category) => category.value)
	);
	const [selectedTags, setSelectedTags] = useState(
		post.tags.map((tag) => tag.label)
	);

	useEffect(() => {
		// update publish & not-publish status
		return post.published
			? setPublishStatus({ value: "1", label: "Publish" })
			: setPublishStatus({ value: "0", label: "Don't published yet" });
	}, [publishStatus, post.published]);

	return (
		<form
			action={updatePost.bind(null, authorId)}
			className="rounded-lg bg-gray-100 px-3 py-6">
			<div className="flex w-full gap-4">
				<TextInput
					className="mb-4 w-1/2"
					name="title"
					label="Title"
					withAsterisk
					size="xs"
					required={true}
					defaultValue={post.title}
					placeholder="Post Title"
				/>
				<TextInput
					size="xs"
					className="mb-4 w-1/2"
					label="Short Description"
					name="shortDescription"
					defaultValue={post.shortDescription}
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
					defaultValue={post.description}
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
					value={selectedTags}
					onChange={setSelectedTags}
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
					value={selectedCategories}
					onChange={setSelectedCategories}
					name="categories"
					clearable
					searchable
					hidePickedOptions
					checkIconPosition="right"
					nothingFoundMessage="Nothing found..."
				/>
			</div>
			<Button
				btnClasses="mt-5"
				type="submit">
				Update
			</Button>
		</form>
	);
}
