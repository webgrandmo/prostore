'use client';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import SignInButton from './sign-in-button';
import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';

import { signInWithCredentials } from '@/lib/actions/user.actions';
import { SIGN_IN_DEFAULT_VALUES } from '@/lib/constants';

const CredentialsSignInForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';

	const [data, action] = useActionState(signInWithCredentials, {
		success: false,
		message: '',
	});
	return (
		<form action={action}>
			<input
				type='hidden'
				name='callbackUrl'
				value={callbackUrl}
			/>
			<div className='space-y-6'>
				<div>
					<Label
						htmlFor='email'
						className='mb-2'>
						Email
					</Label>
					<Input
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						defaultValue={SIGN_IN_DEFAULT_VALUES.email}
						required
					/>
				</div>
				<div>
					<Label
						htmlFor='password'
						className='mb-2'>
						Password
					</Label>
					<Input
						id='password'
						name='password'
						type='password'
						autoComplete='current-password'
						defaultValue={SIGN_IN_DEFAULT_VALUES.password}
						required
					/>
				</div>
				<div>
					<SignInButton />
				</div>
				{data && !data.success && (
					<div className='text-center text-destructive'>{data.message}</div>
				)}
				<div className='text-sm text-center text-muted-foreground'>
					Don&apos;t have an account?{' '}
					<Link
						href='/sign-up'
						target='_self'
						className='link'>
						Sign Up
					</Link>
				</div>
			</div>
		</form>
	);
};

export default CredentialsSignInForm;
