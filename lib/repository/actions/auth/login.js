// import bcrypt from "bcryptjs";
// import prisma from "@/lib/prisma"; // Update to your Prisma client import

// export async function authenticateUser(formData) {
// 	const email = formData.get("email"); // Assuming email is used for authentication
// 	const password = formData.get("password"); // Plain text password from form

// 	try {
// 		// Fetch the user from the database using email
// 		const user = await prisma.user.findUnique({
// 			where: { email },
// 			select: {
// 				id: true,
// 				email: true,
// 				password: true, // Hashed password
// 			},
// 		});

// 		if (!user) {
// 			throw new Error("Invalid credentials: User not found");
// 		}

// 		// Compare the hashed password with the provided password
// 		const isPasswordValid = bcrypt.compareSync(password, user.password);

// 		if (!isPasswordValid) {
// 			throw new Error("Invalid credentials: Incorrect password");
// 		}

// 		// Authentication successful, proceed with further logic
// 		console.log("User authenticated successfully:", user);

// 		// Example: Redirecting after successful authentication
// 		await flashMessage("Welcome back!");
// 		revalidatePath("/dashboard"); // Replace with your path
// 		redirect("/dashboard");

// 		return user; // Optionally return user details
// 	} catch (error) {
// 		console.error("Authentication error:", error.message);

// 		// Optionally handle authentication errors (e.g., show an error message)
// 		throw new Error("Authentication failed. Please try again.");
// 	}
// }
