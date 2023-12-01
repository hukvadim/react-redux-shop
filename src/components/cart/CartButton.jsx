export default function CartButton({ cartCount, toggleCart }) {

    return (
        <button className="cart-added-list__btn" onClick={toggleCart}>
            <span className={`cart-added-summ js-cart-added-summ ${cartCount > 0 ? "show-num" : ""}`}>{cartCount}</span>
            <svg className="icon icon-cart-bag"><use href="#icon-cart-bag"></use></svg>
        </button>
    );
}
