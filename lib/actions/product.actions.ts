'use server';

import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { prisma } from '@/db/prisma';

export async function getLatestProducts() {
	const products = await prisma.product.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		take: LATEST_PRODUCTS_LIMIT,
	});
	await prisma.$disconnect();
	return convertToPlainObject(products);
}

export async function getProductBySlug(slug: string) {
	return await prisma.product.findFirst({
		where: { slug: slug },
	});
}
