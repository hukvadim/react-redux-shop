import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice'
import ProductCard from './ProductCard';

function CatalogContent( { products } ) {

	// Формуємо зверення до сховища
	const dispatch = useDispatch();
	
	// Добавляємо товар в корзину
    const setAddToCart = (productId) => dispatch(addToCart(productId));

	return (
		<div className="catalog__content">

			{products.map((product) => (
				<ProductCard key={product.id} product={product} setAddToCart={setAddToCart} />
			))}

		</div>
	);
}

export default CatalogContent;