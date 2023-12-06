import { Link } from "react-router-dom";

export default function Contacts() {

	return (
		<div className="article">
			<div className="container">
				<h2 className="article__title">Контакти</h2>

				<div className="page-content">
					<p>Якщо вам потрібна допомога або у вас є запитання, будь ласка, зв'яжіться з нами за наступними контактами:</p>

					<p><strong>Email:</strong> example@email.com</p>
					<p><strong>Телефон:</strong> <Link to="tel:+3809312345678">+38 (093) 123-45-678</Link></p>

					<p>Ми знаходимося за адресою:</p>
					<p><strong>Адреса:</strong> <Link to="#" target="_blank">вул. Прикладна, 12345, Київ, Україна</Link></p>

					<p>Завітайте до нас в робочий час:</p>
					<p><strong>Години роботи:</strong> Пн-Пт: 9:00 - 17:00</p>

					<p>Будемо раді вам допомогти!</p>
				</div>
			</div>
		</div>
	);
  }