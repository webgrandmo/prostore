'use server';

import { signInFormSchema, signUpFormSchema } from '../validators';
import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { prisma } from '@/db/prisma';
import { hashSync } from 'bcrypt-ts-edge';
import { success } from 'zod';

// Sign in the user with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
	try {
		const user = signInFormSchema.parse({
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		});
		await signIn('credentials', user);
		return { success: true, message: 'Signed in successfully' };
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		return { success: false, message: 'Invalid email or password' };
	}
}

// Sign up user with credentials
export async function signUpWithCredentials(prevStatue: unknown, formData: FormData) {
	try {
		const user = signUpFormSchema.parse({
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			confirmPassword: formData.get('confirmPassword') as string,
		});

		const plainPassword = user.password;

		user.password = hashSync(user.password, 10);

		await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
			},
		});

		await signIn('credentials', {
			email: user.email,
			password: plainPassword,
		});
		return { success: true, message: 'User registered  successfully' };
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		return { success: false, message: 'User was not registered' };
	}
}

// Sign out the current user
export async function signOutUser() {
	await signOut();
}
