import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

const SignInButton = () => {
	const { pending } = useFormStatus();
	return (
		<Button
			type='submit'
			className='w-full'
			disabled={pending}
			variant='default'>
			{pending ? 'Signing In...' : 'Sign In'}
		</Button>
	);
};

export default SignInButton;
