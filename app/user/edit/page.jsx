import GoBack from "@/components/GoBack";
import prisma from "@/prisma/db";

export default async function UserEditPage({ searchParams }) {
	const params = await searchParams;
	const id = params.id || "";
	if (!id) return notFound();

	const user = await prisma.user.findUnique({
		where: {
			id: +id,
		},
		include: {
			profile: true,
		},
	});

	if (!user) return notFound();

	return (
		<div className="max-w-screen-xl mx-auto p-4 mt-12 relative">
			<div className="max-w-screen-md relative">
				<GoBack />

				<h1 className="mb-5 text-2xl font-bold ">Edit User</h1>
				<form className=" max-w-[40rem] bg-gray-100 py-6 px-3 rounded-lg">
					<div className="flex gap-4 w-full">
						<div className="mb-5 w-1/2">
							<label
								htmlFor="name"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Name
							</label>
							<input
								type="text"
								defaultValue={user.name}
								id="name"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  "
								placeholder="Enter Your Name"
							/>
						</div>
						<div className="mb-5 w-1/2">
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Email Address
							</label>
							<input
								type="email"
								defaultValue={user.email}
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  "
								placeholder="Enter Email Address"
							/>
						</div>
					</div>
					<div className="mb-10">
						<label
							htmlFor="message"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Your Bio
						</label>
						<textarea
							id="bio"
							defaultValue={user.profile.bio}
							name="bio"
							rows="4"
							className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
							placeholder="Write your thoughts here..."></textarea>
					</div>
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Update
					</button>
				</form>
			</div>
		</div>
	);
}
