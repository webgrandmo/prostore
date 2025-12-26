'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const ProductImages = ({ images }: { images: string[] }) => {
	const [current, setCurrent] = useState(0);
	return (
		<div className='space-y-4'>
			<Image
				src={images[current]}
				alt='Product Image'
				width={1000}
				height={1000}
				className='min-h-75 object-cover object-center'
			/>
			<div className='flex'>
				{images.map((image, index) => {
					return (
						<div
							key={image}
							onClick={() => setCurrent(index)}
							className={cn(
								'border mr-2 cursor-pointer hover:border-orange-600',
								current === index && 'border-orange-500'
							)}>
							<Image
								src={image}
								alt='Product Thumbnail'
								width={100}
								height={100}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProductImages;
