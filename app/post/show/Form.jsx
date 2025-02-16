import { Textarea, TextInput } from "@mantine/core";

export default function ShowPostForm({ post }) {
	return (
		<form className="px-6 py-4 bg-white border border-gray-200 shadow-md rounded-2xl">
			<div className="flex w-full gap-4">
				<TextInput
					className="w-1/2 mb-4"
					label="Title"
					size="xs"
					placeholder="Post Title"
					defaultValue={post.title}
					disabled
				/>
				<TextInput
					size="xs"
					className="w-1/2 mb-4"
					label="Short Description"
					placeholder="Post short description"
					defaultValue={post.shortDescription}
					disabled
				/>
			</div>
			<div className="flex w-full gap-4 justify-stretch">
				<Textarea
					className="w-full"
					label="Description"
					placeholder="Describe your post"
					autosize
					minRows={2}
					maxRows={4}
					defaultValue={post.description || ""}
					disabled
				/>
			</div>

			<div className="flex w-full gap-4 mt-2">
				<TextInput
					className="w-1/2 mb-4"
					label="Tags"
					size="xs"
					placeholder="Post Title"
					defaultValue={post.tags.map((tag) => tag.label).join(", ") || ""}
					disabled
				/>
				<TextInput
					className="w-1/2 mb-4"
					label="Published Status"
					size="xs"
					placeholder="Post Title"
					defaultValue={
						post.published ? "published" : "still not published yet"
					}
					disabled
				/>
			</div>
			<div className="flex w-full gap-4 mt-2">
				<TextInput
					className="w-1/2 mb-4"
					label="Created Date"
					size="xs"
					placeholder="Post Title"
					defaultValue={post.createdAt}
					disabled
				/>
				<TextInput
					className="w-1/2 mb-4"
					label="Categories"
					size="xs"
					placeholder="Post Title"
					defaultValue={
						post.categories.map((category) => category.label).join(", ") ||
						""
					}
					disabled
				/>
			</div>
		</form>
	);
}
