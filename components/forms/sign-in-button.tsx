import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

const SignInButton = ({ signUp }: { signUp?: boolean }) => {
	const { pending } = useFormStatus();
	const showSignInText = () => {
		if (!signUp) {
			return pending ? 'Signing In...' : 'Sign In';
		}
		return pending ? 'Signing Up..' : 'Sign Up';
	};
	return (
		<Button
			type='submit'
			className='w-full'
			disabled={pending}
			variant='default'>
			{showSignInText()}
		</Button>
	);
};

export default SignInButton;
