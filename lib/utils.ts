import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
	return JSON.parse(JSON.stringify(value));
}
/*   const NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	function formatNumberWithDecimal(num) {
		return NUMBER_FORMATTER.format(num);
	}
*/
// Formant number with two decimal places
export function formatNumberWithDecimals(value: number): string {
	const [int, dec] = value.toString().split('.');
	return dec ? `${int}.${dec.padEnd(2, '0')}` : `${int}.00`;
}
