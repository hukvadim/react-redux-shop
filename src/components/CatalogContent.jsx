import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import ProductCard from './ProductCard';

function CatalogContent() {
	
	// Формуємо зверення до сховища
	const dispatch = useDispatch();

	// Добавляємо товар в корзину
    const setAddToCart = (productId) => dispatch(addToCart(productId));
	
    // Витягуємо дані каталогу
    const { products, loading, error } = useSelector(state => state.catalog);

	return (
        <div className="catalog__content">

            {(!loading && products.length === 0)
				? <h2 className="no-result">Товарів не знайдено...</h2>
				: products.map((product) => (
					<ProductCard key={product.id} product={product} setAddToCart={setAddToCart} />
				))
			}

			{loading && <p className="no-result">Завантаження...</p>}
            {error && <p className="no-result">Виникла помилка: {error}</p>}

        </div>
    );
}

export default CatalogContent;