import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavigationCartBtn = memo(() => {

	// Витягуємо дані корзини
	const { cart } = useSelector(state => state.cart);
	
	return (
		<li className="navigation__item">
			<Link to={`order`} className="navigation__item-link">
				<span className={`cart-added-summ js-cart-added-summ ${cart.length > 0 ? 'show-num' : ''}`}>{cart.length}</span>
				<svg className="icon icon-cart-bag"><use href="#icon-cart-bag"></use></svg>
			</Link>
		</li>
	);
});

export default NavigationCartBtn;
