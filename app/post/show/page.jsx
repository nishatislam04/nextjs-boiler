import Button from "@/components/Button";
import Form from "@/components/Form";
import FormSelect from "@/components/FormSelect";
import GoBack from "@/components/GoBack";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import prisma from "@/prisma/db";
import { format } from "date-fns";

export default async function ShowPostPage({ searchParams }) {
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
		<div className="max-w-screen-xl mx-auto p-4 mt-12">
			<div className="relative">
				<GoBack />

				<h1 className="mb-5 text-2xl font-bold ">Show Post</h1>

				<Form>
					<div className="flex gap-4 w-full">
						<InputText
							label="Title"
							name="title"
							value={post.title}
							readOnly
							disabled
							placeholder="Enter Post Title"
						/>
						<InputText
							label="Short Description"
							name="shortDescription"
							value={post.shortDescription}
							placeholder="Enter Post short description"
							readOnly
							disabled
						/>
					</div>
					<div className="flex justify-stretch gap-4 w-full">
						<TextArea
							label="Description"
							name="description"
							row="4"
							value={post.description}
							placeholder="Enter Your Post Long Description"
							classes="w-full"
							readOnly
							disabled
						/>
					</div>
					<div className="flex gap-4 w-full ">
						<InputText
							label="created At"
							name="createdAt"
							value={format(post.createdAt, "dd / MM / yyyy")}
							placeholder="Enter Post short description"
							readOnly
							disabled
						/>
						<div className="w-1/2 ml-auto">
							<FormSelect
								label="Publish the post?"
								value={post.published}
								disabled>
								<option>Publish the post?</option>
								<option value="1">Publish</option>
								<option value="0">Don&apos;t publish yet</option>
							</FormSelect>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}
