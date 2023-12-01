import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { linksMain } from "../utils/links";

export default function Navigation() {
	
    // Витягуємо дані корзини
    const { cart } = useSelector(state => state.cart);

	return (
		<div className="navigation">
			<div className="container">
				<div className="navigation__hold">
					<div className="navigation__left">
						<ul className="menu navigation__item-list">
						
							{linksMain.map(({link, val}, key) => (
								<li className="menu__li navigation__item" key={key}>
									<Link to={link} className="menu__link link-hover">{val}</Link>
								</li>
							))}

						</ul>
					</div>
					<div className="navigation__middle">
						<Link to="/" className="logo">I-happy</Link>
					</div>
					<div className="navigation__right">
						<ul className="navigation__item-list">
							<li className="navigation__item">
								<Link to={`search`} className="navigation__item-link">
									<svg className="icon icon-search"><use href="#icon-search"></use></svg>
								</Link>
							</li>
							<li className="navigation__item">
								<Link to={`order`} className="navigation__item-link">
									<span className={`cart-added-summ js-cart-added-summ ${cart.length > 0 ? 'show-num' : ''}`}>{cart.length}</span>
									<svg className="icon icon-cart-bag"><use href="#icon-cart-bag"></use></svg>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}