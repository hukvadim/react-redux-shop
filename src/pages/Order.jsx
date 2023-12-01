import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { cleanCart } from '../store/cartSlice'
import { replaceTemplate } from '../utils';

export default function Order() {
	
	// Формуємо зверення до сховища
	const dispatch = useDispatch();

	// Витягуємо дані корзини
	const { cart } = useSelector(state => state.cart);

    // Для зручності підраховуємо додані товари
    const cartCount = cart.length;

	// Стани для відображення елементів замовлення
	const [formVisible, setFormVisible] = useState(true);
	const [successVisible, setSuccessVisible] = useState(false);
	const [emptyCartVisible, setEmptyCartVisible] = useState(false);
	
	// Стан для полей форми
	const [formData, setFormData] = useState({
        name: "Вадим Гук",
        phone: "+38 (093) 01 - 02 - 003",
        address: "Україна, м. Львів",
    });
	
	// Перевірка на корзину пуста в рамках useEffect
	useEffect(() => {
		if (cartCount === 0) {
		  setFormVisible(false);
		  setSuccessVisible(false);
		  setEmptyCartVisible(true);
		}
	}, [cartCount]); // Відстежуємо зміни cartCount

	// Записуємо зміни з полей форми
	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

	// Робимо подію відправки форми
    const handleSubmit = (e) => {
        e.preventDefault();

		// Замовлені товари
		const orderProducts = cart.map(item => `${item.title} (${item.count})`);

		// Формуємо дані для відправки 
		const sendData = {
			...formData,
			to: 'hukvadim@gmail.com',
			subject: 'Оформлення замовлення',
			message: 'Повідомлення. Може бути і email лист 222.',
			orderProducts: orderProducts.join('<br>')
		};
		
		
		// Завантаження emailSendOrder.html під час завантаження компонента
		fetch(`https://hukvadim.github.io/react-shop/emailSendOrder.html`)
			.then((response) => response.text())
			.then((template) => {

				// Формуємо email шаблон
				sendData['message'] = replaceTemplate(template, sendData);

				// Робимо запит на відправку листа на пошту
				fetch('https://api.inderio.com/send-email', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(sendData),
				})
					.then((response) => response.json())
					.then((data) => {
						setFormVisible(false);
						setSuccessVisible(true);
						setEmptyCartVisible(false);

						setTimeout(() => {
							dispatch(cleanCart());
						}, 3000)
					})
					.catch((error) => {
						console.error('Помилка:', error);
					});
			});
		
    };

	return (
		<div className="article">
			<div className="container">
				<h2 className="article__title">Оформити замовлення</h2>

				<div className="page-content">

					<form id="order-form" onSubmit={handleSubmit} className={!formVisible ? 'hidden' : ''}>
						<p>Якщо вам потрібна допомога або у вас є запитання, будь ласка, зв'яжіться з нами за наступними контактами:</p>
                        <div className="form-group">
                            <label htmlFor="name">Ім'я:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Телефон:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="form-control"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Адреса доставки:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                required
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

						<button type="submit" className="btn">Оформити замовлення</button>
					</form>

					<h2 className={`form-success ${(successVisible) ? 'show' : 'hidden'}`}>Замовлення успішно відправлено!</h2>

					<h2 className={`form-empty ${(emptyCartVisible) ? 'show' : 'hidden'}`}>Корзина пуста!</h2>
					
				</div>
			</div>
		</div>
	);
}