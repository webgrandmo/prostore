import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from './product-price';

const ProductCard = ({ product }: { product: any }) => {
	return (
		<Card className='w-full max-w-sm border-gray-200 py-0'>
			<p></p>
			<CardHeader className='p-0 items-center'>
				<Link href={`/product/${product.slug}`}>
					<Image
						src={product.images[0]}
						alt={product.name}
						width={300}
						height={300}
						loading='eager'
						priority={true}
						className='rounded-t-xl'
					/>
				</Link>
			</CardHeader>
			<CardContent className='p-4 grid gap-4'>
				<div className='text-xs'>{product.brand}</div>
				<Link href={`/product/${product.slug}`}>
					<h3 className='text-sm font-medium'>{product.name}</h3>
				</Link>
				<div className='flex-between gap-4'>
					<p>{product.rating} Stars</p>
					{product.stock > 0 ? (
						<ProductPrice value={Number(product.price)} />
					) : (
						<p className='text-destructive'>Out Of Stock</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
