import { cn } from '@/lib/utils';

const ProductPrice = ({ value, className }: { value: number; className?: string }) => {
	// Ensure two decimal places
	const formattedValue = value.toFixed(2);

	// Get the int and float parts
	const [intPart, floatPart] = formattedValue.split('.');

	return (
		<p className={cn('text-2xl', className)}>
			<span className='text-xs align-super'>$</span>
			{intPart}
			<span className='text-xs align-super'>.{floatPart}</span>
		</p>
	);
};

export default ProductPrice;
