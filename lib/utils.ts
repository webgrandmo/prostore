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

// Format form errors

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
	if (error.name === 'ZodError') {
		// Handle Zod Error
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const fieldErrors = JSON.parse(error.message).map((err: any) => err.message);
		console.log(fieldErrors);

		return fieldErrors.join('. ');
	} else if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
		// Handle Prisma Error
		const field = error.meta?.target ? error.meta.target[0] : 'Field';
		return `This ${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
	} else {
		// Handle Other Errors
		return typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
	}
}
