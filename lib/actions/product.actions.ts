'use server';

import { PrismaClient } from '@/src/generated/prisma/client';

export async function getLatestProducts() {
	const prisma = new PrismaClient();
	const products = await prisma.product.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		take: 4,
	});
	await prisma.$disconnect();
	return products;
}
