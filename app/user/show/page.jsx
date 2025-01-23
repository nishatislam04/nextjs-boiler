import Button from "@/components/Button";
import Form from "@/components/Form";
import GoBack from "@/components/GoBack";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import prisma from "@/prisma/db";
import { notFound } from "next/navigation";
import { cache } from "react";

export default async function UserShowPage({ searchParams }) {
	const params = await searchParams;
	const id = params.id || "";
	if (!id) return notFound();

	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
		include: {
			profile: true,
		},
	});
	if (!user) return notFound();

	return (
		<div className="max-w-screen-xl mx-auto p-4 mt-12">
			<div className="relative">
				<GoBack />

				<h1 className="mb-5 text-2xl font-bold ">Show User</h1>

				<Form>
					<div className="flex gap-4 w-full">
						<InputText
							value={user.name}
							label="Name"
							readOnly
							disabled
						/>
						<InputText
							value={user.email}
							label="Email Address"
							type="email"
							readOnly
							disabled
						/>
					</div>
					<div className="flex gap-4 w-full">
						<InputText
							value={user.username}
							label="Userame"
							readOnly
							disabled
						/>
						<InputText
							value={user.profile.website}
							label="Website Link"
							readOnly
							disabled
						/>
					</div>
					<TextArea
						value={user.profile.bio}
						label="Your Bio"
						row="2"
						readOnly
						disabled
					/>
					<div className="flex gap-4 w-full">
						<InputText
							value={user.profile.location}
							label="Location"
							readOnly
							disabled
						/>
					</div>
				</Form>
			</div>
		</div>
	);
}
