import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseItemCount, decreaseItemCount } from '../../store/cartSlice'
import CartNoResult from './CartNoResult';
import CartItem from './CartItem';
import config from '../../utils/config';
import { getCartVisibility, setCartVisibility } from '../../utils/utils';

function Cart() {

    // Формуємо зверення до сховища
    const dispatch = useDispatch();

    // Витягуємо дані корзини
    const { cart } = useSelector(state => state.cart);

    // Для зручності підраховуємо додані товари
    const cartCount = cart.length;

    // Видалення товару з корзини
    const delCartProduct = (productId) => dispatch(removeFromCart({id: productId}));

    // Добавляємо кількість товарів
    const setItemCountPlus = (productId) => dispatch(increaseItemCount({id: productId}));

    // Забираємо кількість товарів
    const setItemCountMinus = (productId) => dispatch(decreaseItemCount({id: productId}));
    
    // Використовуємо useState для збереження стану корзини
    const [cartVisibility, setCartVisibilityEl] = useState(getCartVisibility());

	// Показуємо і приховуємо корзину замовлених товарів
	const toggleCartVisibility = () => {
		setCartVisibilityEl(!cartVisibility);
		setCartVisibility(!cartVisibility);
	};

    return (
        <div className="cart-added-list">

            <button className="cart-added-list__btn" onClick={toggleCartVisibility}>
                <span className={`cart-added-summ js-cart-added-summ ${cartCount > 0 ? 'show-num' : ''}`}>{cartCount}</span>
                <svg className="icon icon-cart-bag"><use href="#icon-cart-bag"></use></svg>
            </button>

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
