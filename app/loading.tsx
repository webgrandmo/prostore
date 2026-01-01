import Image from 'next/image';
import loading from '@/assets/loader.gif';

const LoadingPage = () => {
	return (
		<div className='flex justify-center items-center w-full h-screen'>
			<Image
				src={loading}
				alt='Loading...'
				width={150}
				height={150}
				unoptimized
			/>
		</div>
	);
};

export default LoadingPage;
