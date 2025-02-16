import { Textarea, TextInput } from "@mantine/core";

/**
 * USER PROFILE FORM PART
 *
 * @param param0
 * @param param0.user
 */
export default function UserShowForm({ user }) {
	return (
		<form className="px-6 py-6 bg-white border border-gray-200 shadow-md rounded-xl">
			<div className="flex w-full gap-4">
				<TextInput
					className="w-1/2 mb-4"
					label="Name"
					size="xs"
					placeholder="User name"
					defaultValue={user.name}
					disabled
				/>
				<TextInput
					className="w-1/2 mb-4"
					label="Email Address"
					size="xs"
					placeholder="Email address"
					defaultValue={user.email}
					disabled
				/>
			</div>
			<div className="flex w-full gap-4">
				<TextInput
					className="w-1/2 mb-4"
					label="User Name"
					size="xs"
					placeholder="username"
					defaultValue={user.username}
					disabled
				/>
				<TextInput
					className="w-1/2 mb-4"
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
					className="w-1/3 mb-4"
					label="User Location"
					size="xs"
					placeholder="user location"
					defaultValue={user.profile?.location || ""}
					disabled
				/>
				<TextInput
					className="w-1/3 mb-4"
					label="Roles"
					size="xs"
					placeholder="Roles"
					defaultValue={user.roles.role.join(", ") || ""}
					disabled
				/>
				<TextInput
					className="w-1/3 mb-4"
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
