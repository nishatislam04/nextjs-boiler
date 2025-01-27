import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";

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
	debug: true,
	callbacks: {},
});
