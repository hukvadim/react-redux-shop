import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import ProductCard from './ProductCard';

const CatalogContent = ({ products, loading, error }) => {
	console.log("loading: ", loading, products);
	
	// Формуємо зверення до сховища
	const dispatch = useDispatch();

	// Добавляємо товар в корзину
    const setAddToCart = (productId) => dispatch(addToCart(productId));
	
	return (
        <div className="catalog__content">

            {
			(loading) 
				? <p className="no-result">Завантаження...</p>
				: (products.length === 0)
					? <h2 className="no-result">Товарів не знайдено...</h2>
					: products.map((product) => (
						<ProductCard key={product.id} product={product} setAddToCart={setAddToCart} />
					))
			}

            {error && <p className="no-result">Виникла помилка: {error}</p>}

        </div>
    );
}

export default CatalogContent;