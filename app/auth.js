import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHub({
			profile(profile) {
				return {
					name: profile.name,
					username: profile.login,
					email: profile.email,
					image: profile.avatar_url,
				};
			},
		}),
	],
	callbacks: {
		async authorized({ auth }) {
			return !!auth; // Check if the user is authenticated
		},
	},
});
