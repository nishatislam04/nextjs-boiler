import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHub({
			// allowDangerousEmailAccountLinking: true,
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
		async signIn({ user, account }) {
			// Check if a user already exists with this email
			const existingUser = await prisma.user.findUnique({
				where: { email: user.email },
			});

			if (existingUser) {
				// Ensure the account is linked to the existing user
				await prisma.account.upsert({
					where: {
						provider_providerAccountId: {
							provider: account.provider,
							providerAccountId: account.id,
						},
					},
					update: {},
					create: {
						userId: existingUser.id,
						provider: account.provider,
						providerAccountId: account.id,
						type: account.type,
						access_token: account.access_token,
						refresh_token: account.refresh_token,
						expires_at: account.expires_at,
					},
				});
			}

			return true; // Allow login
		},
	},
});
