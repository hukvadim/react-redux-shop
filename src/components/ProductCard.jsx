import config from '../utils/config';

export default function ProductCard({ product, setAddToCart }) {

	const { id, title, img, price, oldprice } = product;

    return (
        <div className="card-product" key={id}>
            <div className="card-product__img-hold" onClick={() => setAddToCart(product)}>
                <img src={config.pathImg + img} alt={title} className="card-product__img" />
            </div>
            <div className="card-product__text-hold">
				<div className="card-product__title-link" onClick={() => setAddToCart(product)}>{title}</div>
                <span className="card-product__price">
                    {price} грн <small>{oldprice} грн</small>
                </span>
                <div className="card-product__btn-add" onClick={() => setAddToCart(product)}>
                    <svg className="icon icon-cart"><use href="#icon-cart-add"></use></svg>
                </div>
            </div>
        </div>
    );
}
 