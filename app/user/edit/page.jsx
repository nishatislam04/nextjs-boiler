import { updateUser } from "@/actions/users/update";
import Button from "@/components/Button";
import Form from "@/components/Form";
import GoBack from "@/components/GoBack";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import prisma from "@/prisma/db";

export default async function UserEditPage({ searchParams }) {
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
		<div className="max-w-screen-xl mx-auto p-4 mt-12 relative">
			<div className="relative">
				<GoBack />

				<h1 className="mb-5 text-2xl font-bold ">Edit User</h1>

				<Form action={updateUser.bind(null, user.id)}>
					<div className="flex gap-4 w-full">
						<InputText
							value={user.name}
							label="Name"
							name="name"
							required={true}
							placeholder="Enter Your Name"
						/>
						<InputText
							value={user.email}
							label="Email Address"
							name="email"
							type="email"
							required={true}
							placeholder="Enter Your Email Address"
						/>
					</div>
					<div className="flex gap-4 w-full">
						<InputText
							value={user.username}
							label="Userame"
							name="username"
							required={true}
							placeholder="Enter UserName"
						/>
						<InputText
							value={user.profile.website}
							label="Website Link"
							name="website"
							placeholder="Enter Website Link"
						/>
					</div>
					<TextArea
						value={user.profile.bio}
						label="Your Bio"
						name="bio"
						row="2"
						placeholder="Enter Your Bio Information"
						helperMessage="You can ignore ths field for later"
					/>
					<div className="flex gap-4 w-full">
						<InputText
							value={user.profile.location}
							label="Location"
							name="location"
							placeholder="Enter Location"
						/>
					</div>
					<Button type="submit">Update</Button>
				</Form>
			</div>
		</div>
	);
}
