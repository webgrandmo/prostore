import { getLatestProducts } from '@/lib/actions/product.actions';
import ProductList from '@/components/shared/product/product-list';
import { convertToPlainObject } from '@/lib/utils';
export const metadata = {
	title: 'Home',
};

const Homepage = async () => {
	const latestProducts = convertToPlainObject(await getLatestProducts());
	return (
		<>
			<ProductList
				data={latestProducts}
				title='Newest Arrivals'
				limit={4}
			/>
		</>
	);
};

export default Homepage;
