import { memo } from 'react';

const CartItem = memo(({ product, pathImg, delCartProduct, setItemCountPlus, setItemCountMinus }) => {
	const { id, title, img, price, count } = product;
	
	return (
		// Відображення товарів з Local Storage
		<div className="cart-added-list__item">
			<button className="cart-added-list__item-btn-delete btn-light" onClick={() => delCartProduct(id)}>
				<svg className="icon icon-close"><use href="#icon-close"></use></svg>
			</button>
			<img src={pathImg + img} alt="" className="cart-added-list__item-img" />
			<p className="cart-added-list__item-text-hold">
				<span className="cart-added-list__item-title-link">{title}</span>
				<span className="cart-added-list__item-meta-list">
					<span className="cart-added-list__item-meta">Ціна: {price} грн</span>
				</span>
			</p>
			<input type="text" className="cart-added-list__item-count" value={count} readOnly/>
			<button className="cart-added-list__item-btn-plus btn-light" onClick={() => setItemCountPlus(id)}></button>
			<button className="cart-added-list__item-btn-minus btn-light" onClick={() => setItemCountMinus(id)}></button>
		</div>
	)
});

export default CartItem;