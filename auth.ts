import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import { Session } from 'next-auth';
import { User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const config = {
	pages: {
		signIn: '/sign-in',
		error: '/sign-in',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		// Add your authentication providers here
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = await prisma.user.findUnique({
					where: { email: credentials.email as string },
				});

				if (user && user.password) {
					const isPasswordValid = compareSync(
						credentials.password as string,
						user.password
					);
					if (isPasswordValid) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role,
						};
					}
				}

				// If user not found or password is invalid,
				return null;
			},
		}),
	],
	callbacks: {
		async session({
			session,
			user,
			trigger,
			token,
		}: {
			session: Session;
			user?: User;
			trigger?: 'update';
			token: JWT;
		}) {
			// Add custom fields to session
			if (session.user) {
				session.user.id = token.sub as string;

				if (trigger === 'update' && user?.name) {
					session.user.name = user.name;
				}

				if (token.role) {
					// Extend session.user with role
					(session.user as typeof session.user & { role?: string }).role =
						token.role as string;
				}
			}

			return session;
		},
	},
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
