import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Logger from "@/lib/logger";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
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
          include: {
            roles: true,
          },
        });

        if (!user) return null;

        // Verify the password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValidPassword) return null;

        // Return the user object if credentials are valid
        return user;
      },
    }),
  ],

  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },

    async signIn({ user, account }) {
      // Ensure the user has an email address
      if (!user.email) return false;

      // Check if the user already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { account: true, roles: true },
      });

      if (!existingUser) {
        // 🆕 New user → Create user and related account (GitHub or Google)
        Logger.info(null, "New user found, creating account...");

        // Get the "Member" role
        const memberRole = await prisma.role.findUnique({
          where: { name: "member" },
        });
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || "",
            image: user.image || "",
            username: user.username || "",
            password: await await bcrypt.hash("123456", 10),
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
            roles: {
              connect: { id: memberRole.id },
            },
          },
        });
      } else {
        // ✅ User exists → Check if the account already exists for this provider

        const existingAccount = existingUser.account.find(
          (acc) => acc.provider === account.provider,
        );

        if (existingAccount) {
          // ⚠️ Account already exists → Update the existing account
          Logger.info(
            null,
            "Existing account found for this provider, updating...",
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

          // member role
          const memberRole = await prisma.role.findUnique({
            where: { name: "member" },
          });
          // assign member role to new auth user
          await prisma.user.update({
            where: { email: user.email },
            data: { roles: { connect: { id: memberRole.id } } },
          });

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
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.user.id,
          username: token.user.username,
          roles: token.user.roles,
          ...session.user,
        },
        sessionToken: token.sessionToken,
        userId: token.user.id,
        expires: token.expires,
      };
    },

    async jwt({ token, user, account }) {
      if (user) {
        // Fetch user roles
        Logger.info(null, "fetch user roles from db");
        const userRoles = await prisma.role.findMany({
          where: { users: { some: { id: user.id } } },
          select: { name: true },
        });

        // ✅ Embed user data inside JWT
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          username: user.username,
          roles: userRoles.map((role) => role.name),
        };

        token.sessionToken = account?.sessionToken || null;
        token.expires = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(); // 30 days expiry
      }

      return token;
    },

    async redirect({ url, baseUrl }) {
      // ✅ Always redirect to the home page after successful sign-in
      return baseUrl + "/";
    },
  },

  session: {
    strategy: "jwt",
  },
});
