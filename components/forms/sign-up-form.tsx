'use client';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import SignInButton from './sign-in-button';
import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';

import { signUpWithCredentials } from '@/lib/actions/user.actions';
import { SIGN_UP_DEFAULT_VALUES } from '@/lib/constants';

const SignUpForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';

	const [data, action] = useActionState(signUpWithCredentials, {
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
						htmlFor='name'
						className='mb-2'>
						Name
					</Label>
					<Input
						id='name'
						name='name'
						type='text'
						autoComplete='name'
						defaultValue={SIGN_UP_DEFAULT_VALUES.name}
					/>
				</div>
				<div>
					<Label
						htmlFor='email'
						className='mb-2'>
						Email
					</Label>
					<Input
						id='email'
						name='email'
						type='text'
						autoComplete='email'
						defaultValue={SIGN_UP_DEFAULT_VALUES.email}
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
						defaultValue={SIGN_UP_DEFAULT_VALUES.password}
						required
					/>
				</div>
				<div>
					<Label
						htmlFor='confirmPassword'
						className='mb-2'>
						Confirm Password
					</Label>
					<Input
						id='confirmPassword'
						name='confirmPassword'
						type='password'
						autoComplete='current-confirmPassword'
						defaultValue={SIGN_UP_DEFAULT_VALUES.confirmPassword}
						required
					/>
				</div>
				<div>
					<SignInButton signUp={true} />
				</div>
				{data && !data.success && (
					<div className='text-center text-destructive'>{data.message}</div>
				)}
				<div className='text-sm text-center text-muted-foreground'>
					Already have an account?{' '}
					<Link
						href='/sign-in'
						target='_self'
						className='link'>
						Sign In
					</Link>
				</div>
			</div>
		</form>
	);
};

export default SignUpForm;
