import { Link } from "react-router-dom";
import { linksFooter } from "../utils/Links";

export default function Footer() {

  return (
	<div className="footer">
		<div className="container">
			<a href="index.html" className="logo">I-happy</a>

			<ul className="navbar-nav menu">

				{linksFooter.map(({link, val}, key) => (
					<li className="nav-item menu__li" key={key}>
						<Link to={link} className="nav-link menu__link link-hover">{val}</Link>
					</li>
				))}

			</ul>

			<div className="footer__social">
				<div className="social">
					<Link to="#" rel="nofollow" target="_blank" className="social__item facebook">
						<svg className="icon icon-facebook"><use href="#icon-facebook"></use></svg>
					</Link>
					<Link to="#" rel="nofollow" target="_blank" className="social__item instagram">
						<svg className="icon icon-instagram"><use href="#icon-instagram"></use></svg>
					</Link>
					<Link to="#" rel="nofollow" target="_blank" className="social__item youtube">
						<svg className="icon icon-youtube"><use href="#icon-youtube"></use></svg>
					</Link>
				</div>
			</div>

			<p className="footer__copyright">
				<span>Всі права на статті, ілюстрації, інші матеріали належать site.com та охороняються законом України«Про авторське право і суміжні права».<br />При використанні матеріалів посилання на сайт</span>
				<span className="footer__developer">
					Розробник сайту:
					<Link to="#" target="_blank">Vadim Huk</Link>
				</span>
			</p>
		</div>
	</div>
  );
}