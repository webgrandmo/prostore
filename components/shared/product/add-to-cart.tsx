'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { CartItem } from '@/types';
import { addItemToCart } from '@/lib/actions/add-to-cart.actions';

const AddToCart = ({ item }: { item: CartItem }) => {
	const router = useRouter();
	const handleAddToCart = async () => {
		const res = await addItemToCart(item);

		if (!res.success) {
			toast.error(res.message, {
				classNames: {
					toast: '!bg-red-300',
					description: '!text-red-900',
				},
			});
			return;
		}

		// Handle success add to cart
		toast.success(`${item.name} added to cart`, {
			classNames: {
				toast: '!bg-green-300',
				description: '!text-green-900',
			},
			action: (
				<Button
					onClick={() => router.push('/cart')}
					title='Go To Cart'>
					{' '}
					Go To Cart
				</Button>
			),
		});
	};
	return (
		<Button
			className='w-full'
			type='button'
			onClick={handleAddToCart}>
			<Plus />
			Add to cart
		</Button>
	);
};

export default AddToCart;
