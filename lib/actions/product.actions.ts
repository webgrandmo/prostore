'use server';

import { PrismaClient } from '@/src/generated/prisma/client';
import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';

export async function getLatestProducts() {
	const prisma = new PrismaClient();
	const products = await prisma.product.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		take: LATEST_PRODUCTS_LIMIT,
	});
	await prisma.$disconnect();
	return convertToPlainObject(products);
}
