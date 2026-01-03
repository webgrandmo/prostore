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
		async session({ session, token }: { session: Session; token: JWT }) {
			// Set the user ID from the token
			if (session.user) {
				session.user.id = token.sub;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(session.user as any).role = token.role as string;
				session.user.name = token.name;
			}

			return session;
		},

		async jwt({ token, user }: { token: JWT; user?: User }) {
			if (user) {
				token.id = user.id;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				token.role = (user as any).role;

				// If user has no name then use the email
				if (user.name === 'NO_NAME') {
					token.name = user.email!.split('@')[0];

					// Update database to reflect the token name
					await prisma.user.update({
						where: { id: user.id },
						data: { name: token.name },
					});
				}
			}

			return token;
		},
	},
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
