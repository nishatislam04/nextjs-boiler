import { Textarea, TextInput } from "@mantine/core";

export default function UserShowForm({ user }) {
	return (
		<form className="rounded-lg bg-gray-100 px-3 py-6">
			<div className="flex w-full gap-4">
				<TextInput
					className="mb-4 w-1/2"
					label="Name"
					size="xs"
					placeholder="User name"
					defaultValue={user.name}
					disabled
				/>
				<TextInput
					className="mb-4 w-1/2"
					label="Email Address"
					size="xs"
					placeholder="Email address"
					defaultValue={user.email}
					disabled
				/>
			</div>
			<div className="flex w-full gap-4">
				<TextInput
					className="mb-4 w-1/2"
					label="User Name"
					size="xs"
					placeholder="username"
					defaultValue={user.username}
					disabled
				/>
				<TextInput
					className="mb-4 w-1/2"
					label="Website Link"
					size="xs"
					placeholder="user website"
					defaultValue={user.profile?.website || ""}
					disabled
				/>
			</div>
			<Textarea
				className="w-full"
				label="User Bio"
				placeholder="user bio"
				autosize
				minRows={2}
				maxRows={4}
				defaultValue={user.profile?.bio || ""}
				disabled
			/>
			<div className="flex w-full gap-4">
				<TextInput
					className="mb-4 w-1/3"
					label="User Location"
					size="xs"
					placeholder="user location"
					defaultValue={user.profile?.location || ""}
					disabled
				/>
				<TextInput
					className="mb-4 w-1/3"
					label="Roles"
					size="xs"
					placeholder="Roles"
					defaultValue={user.roles.role.join(", ") || ""}
					disabled
				/>
				<TextInput
					className="mb-4 w-1/3"
					label="Post Uploaded"
					size="xs"
					placeholder="Post uploaded count"
					defaultValue={user.posts.count || "0"}
					disabled
				/>
			</div>
		</form>
	);
}
