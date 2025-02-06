import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Logger from "@/lib/logger";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: {
		...PrismaAdapter(prisma),
		linkAccount: async (_) => null,
	},

	providers: [
		GitHub({
			// Allow linking account with the same email address
			allowDangerousEmailAccountLinking: true,

			// Customize the profile data returned from GitHub
			profile(profile) {
				return {
					name: profile.name,
					username: profile.login,
					email: profile.email,
					image: profile.avatar_url,
				};
			},
		}),

		Google({
			// Allow linking account with the same email address
			allowDangerousEmailAccountLinking: true,

			// Customize the profile data returned from Google
			profile(profile) {
				return {
					name: profile.name,
					email: profile.email,
					username: `${profile.name.replaceAll(" ", "")}`,
					image: profile.picture,
				};
			},
		}),

		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials) {
				const user = await prisma.user.findFirst({
					where: {
						OR: [
							{ email: credentials.email },
							{ username: credentials.username },
						],
					},
				});

				if (!user) return null;

				// Verify the password
				const isValidPassword = await Bun.password.verify(
					credentials.password,
					user.password
				);

				if (!isValidPassword) return null;

				// Return the user object if credentials are valid
				return user;
			},
		}),
	],

	callbacks: {
		async signIn({ user, account }) {
			// Ensure the user has an email address
			if (!user.email) return false;

			// Check if the user already exists in the database
			const existingUser = await prisma.user.findUnique({
				where: { email: user.email },
				include: { account: true }, // Include related account
			});

			if (!existingUser) {
				// 🆕 New user → Create user and related account (GitHub or Google)
				Logger.info(null, "New user found, creating account...");
				await prisma.user.create({
					data: {
						email: user.email,
						name: user.name || "",
						image: user.image || "",
						username: user.username || "",
						password: await Bun.password.hash("123456"),
						role: "Member",
						account: {
							create: {
								provider: account.provider,
								providerAccountId: account.providerAccountId,
								type: account.type,
								access_token: account.access_token || null,
								refresh_token: account.refresh_token || null,
								expires_at: account.expires_at || null,
							},
						},
					},
				});
			} else {
				// ✅ User exists → Check if the account already exists for this provider
				const existingAccount = existingUser.account.find(
					(acc) => acc.provider === account.provider
				);

				if (existingAccount) {
					// ⚠️ Account already exists → Update the existing account
					Logger.info(
						null,
						"Existing account found for this provider, updating..."
					);
					await prisma.account.update({
						where: {
							id: existingAccount.id, // Use the existing account's ID
						},
						data: {
							access_token: account.access_token || null,
							refresh_token: account.refresh_token || null,
							expires_at: account.expires_at || null,
						},
					});
				} else {
					// 🔗 Link new provider account to existing user
					Logger.info(null, "Linking new provider account to user...");
					Logger.info(account, "google account details");
					await prisma.account.create({
						data: {
							userId: existingUser.id, // Link new account to the existing user
							provider: account.provider,
							providerAccountId: account.providerAccountId,
							type: account.type,
							access_token: account.access_token || null,
							refresh_token: account.refresh_token || null,
							expires_at: account.expires_at || null,
						},
					});
				}
			}

			// ✅ Allow login
			return true;
		},

		//! need to customize session for credentials
		async session({ session, user }) {
			if (user?.id) {
				session.user.id = user.id;
			}
			return session;
		},
	},

	session: {
		strategy: "jwt",
	},
});
