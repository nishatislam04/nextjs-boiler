import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHub({
			profile(profile) {
				return { role: profile.role ?? "member" };
			},
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth;
		},
		session({ session, user }) {
			session.user.id = user.id;
			session.user.role = user.role;
			return session;
		},
	},
});
