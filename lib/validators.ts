import { z } from 'zod';
import { formatNumberWithDecimals } from './utils';

const currency = z.string().refine(
	(val) => {
		return /^(\d+(\.\d{2})?)$/.test(formatNumberWithDecimals(Number(val)));
	},
	{ message: 'Product price must have exactly two decimal places' }
);

// Schema for inserting products

export const insertProductSchema = z.object({
	name: z.string().min(3, 'Product name must be at least 3 character long'),
	slug: z.string().min(3, 'Product slug must be at least 3 character long'),
	category: z.string().min(3, 'Product category must be at least 3 character long'),
	description: z.string().min(3, 'Product description must be at least 3 character long'),
	brand: z.string().min(3, 'Product brand must be at least 3 character long'),
	stock: z.coerce.number().min(0, 'Stock cannot be negative'),
	images: z.array(z.string().min(1, 'At least one image is required')),
	isFeatured: z.boolean(),
	banner: z.string().nullable(),
	price: currency,
});

// Schema for Sign In form
export const signInFormSchema = z.object({
	email: z.email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});
