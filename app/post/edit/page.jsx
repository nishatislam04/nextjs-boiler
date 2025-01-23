import Button from "@/components/Button";
import Form from "@/components/Form";
import GoBack from "@/components/GoBack";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import prisma from "@/prisma/db";
import { notFound } from "next/navigation";

import { updatePost } from "@/actions/posts/update";
import FormSelect from "@/components/FormSelect";

export default async function EditPostPage({ searchParams }) {
	const params = await searchParams;
	const id = params.id || "";
	// if (!id) return notFound();

	const post = await prisma.post.findUnique({
		where: {
			id: +id,
		},
	});

	// if (!user) return notFound();
	return (
		<div className="max-w-screen-xl mx-auto p-4 mt-12 relative">
			<div className="relative">
				<GoBack />

				<h1 className="mb-5 text-2xl font-bold ">Edit Post</h1>

				<Form action={updatePost.bind(null, post.id)}>
					<div className="flex gap-4 w-full">
						<InputText
							label="Title"
							name="title"
							required={true}
							defaultValue={post.title}
							placeholder="Enter Post Title"
						/>
						<InputText
							label="Short Description"
							name="shortDescription"
							defaultValue={post.shortDescription}
							placeholder="Enter Post short description"
						/>
					</div>
					<div className="flex justify-stretch gap-4 w-full">
						<TextArea
							label="Description"
							name="description"
							row="4"
							defaultValue={post.description}
							placeholder="Enter Your Post Long Description"
							classes="w-full"
						/>
					</div>

					<div className="flex gap-4 w-1/2 ml-auto">
						<FormSelect
							label="Publish the post?"
							value={post.published}>
							<option>Publish the post?</option>
							<option value="1">Publish</option>
							<option value="0">Don&apos;t publish yet</option>
						</FormSelect>
					</div>
					<Button
						btnClasses="mt-5"
						type="submit">
						Update
					</Button>
				</Form>
			</div>
		</div>
	);
}
