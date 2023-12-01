import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseItemCount, decreaseItemCount, changeCartVisibility } from '../../store/cartSlice'
import CartNoResult from './CartNoResult';
import CartItem from './CartItem';
import config from '../../utils/config';
import CartButton from './CartButton';

function Cart() {

    // Формуємо зверення до сховища
    const dispatch = useDispatch();

    // Витягуємо дані корзини
    const { cart, cartVisibility } = useSelector(state => state.cart);
    
    // Для зручності підраховуємо додані товари
    const cartCount = cart.length;

    // Видалення товару з корзини
    const delCartProduct = (productId) => dispatch(removeFromCart({id: productId}));

    // Добавляємо кількість товарів
    const setItemCountPlus = (productId) => dispatch(increaseItemCount({id: productId}));

    // Забираємо кількість товарів
    const setItemCountMinus = (productId) => dispatch(decreaseItemCount({id: productId}));

	// Показуємо і приховуємо корзину замовлених товарів
	const toggleCart = () =>  dispatch(changeCartVisibility());

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
