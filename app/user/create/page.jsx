import { createUser } from "@/actions/users/create";
import Button from "@/components/Button";
import Form from "@/components/Form";
import GoBack from "@/components/GoBack";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";

export default function UserCreatePage() {
	return (
		<div className="max-w-screen-xl mx-auto p-4 mt-12 relative">
			<div className="relative">
				<GoBack />

				<h1 className="mb-5 text-2xl font-bold ">Create User</h1>

				<Form action={createUser}>
					<div className="flex gap-4 w-full">
						<InputText
							label="Name"
							name="name"
							required={true}
							placeholder="Enter Your Name"
						/>
						<InputText
							label="Email Address"
							name="email"
							type="email"
							required={true}
							placeholder="Enter Your Email Address"
						/>
					</div>
					<div className="flex gap-4 w-full">
						<InputText
							label="Userame"
							name="username"
							required={true}
							placeholder="Enter UserName"
						/>
						<InputText
							label="Password"
							name="password"
							type="password"
							autoComplete="on"
							placeholder="Enter Password"
						/>
					</div>
					<TextArea
						label="Your Bio"
						name="bio"
						row="2"
						placeholder="Enter Your Bio Information"
						helperMessage="You can ignore ths field for later"
					/>
					<div className="flex gap-4 w-full">
						<InputText
							label="Website Link"
							name="website"
							placeholder="Enter Website Link"
						/>
						<InputText
							label="Location"
							name="location"
							placeholder="Enter Location"
						/>
					</div>
					<Button type="submit">Submit</Button>
				</Form>
			</div>
		</div>
	);
}
