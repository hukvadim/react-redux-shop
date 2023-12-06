import { Link } from "react-router-dom";
import { linksMain } from "../utils/links";
import { useState } from 'react';
import NavigationBtnCart from './navigation/NavigationBtnCart';
import NavigationBtnBurder from './navigation/NavigationBtnBurder';

export default function Navigation() {
	
	// Переключалка мобільне меню
	const [mobileNav, setMobileNav] = useState(false);

	return (
		<div className="navigation">
			<div className="container">
				<div className="navigation__hold">
					<div className={`navigation__left navigation__links ${mobileNav ? 'show' : ''}`}>
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
							<NavigationBtnCart />
							<NavigationBtnBurder mobileNav={mobileNav} setMobileNav={setMobileNav} />
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}