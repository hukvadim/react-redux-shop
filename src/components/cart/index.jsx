import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseItemCount, decreaseItemCount, changeCartVisibility } from '../../store/cartSlice'
import CartNoResult from './CartNoResult';
import CartItem from './CartItem';
import config from '../../utils/config';
import CartButton from './CartButton';
import { useCallback } from 'react';

function Cart() {

    // Формуємо зверення до сховища
    const dispatch = useDispatch();

    // Витягуємо дані корзини
    const { cart, cartVisibility } = useSelector(state => state.cart);
    
    // Для зручності підраховуємо додані товари
    const cartCount = cart.length;

    // Видалення товару з корзини
    const delCartProduct = useCallback((productId) => dispatch(removeFromCart({id: productId})), [dispatch]);

    // Добавляємо кількість товарів
    const setItemCountPlus = useCallback((productId) => dispatch(increaseItemCount({id: productId})), [dispatch]);

    // Забираємо кількість товарів
    const setItemCountMinus = useCallback((productId) => dispatch(decreaseItemCount({id: productId})), [dispatch]);

	// Показуємо і приховуємо корзину замовлених товарів
	const toggleCart = useCallback(() =>  dispatch(changeCartVisibility()), [dispatch]);

    return (
        <div className="cart-added-list">
            <CartButton cartCount={cartCount} toggleCart={toggleCart} />
            <div className={`cart-added-list__item-list ${cartVisibility ? 'show' : ''}`}>
                {cart.length === 0 ? (
                    <CartNoResult />
                ) : (
                    cart.map((product, index) => {
                        const cartItemProps = {
                            key: index,
                            pathImg: config.pathImg,
                            product,
                            delCartProduct,
                            setItemCountPlus,
                            setItemCountMinus,
                        };
                        return <CartItem {...cartItemProps} />;
                    })
                )}
            </div>
        </div>
    );
}

export default Cart;
