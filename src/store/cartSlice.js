import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: [],
		cartVisibility: false
	},
	reducers: {
		addToCart(state, action) {

			// Формуємо дані товару
			const product = action.payload;

			// Шукаємо товар для захисту від дублікату
			const productExistKey = state.cart.findIndex((item) => item.id === product.id);
			
			// Добавляємо товар до масиву або кількість в товарі, якщо він є
			if (productExistKey !== -1) {

				// Якщо товар вже є в корзині, збільшуємо кількість
				state.cart[productExistKey].count++;
			
			} else {

				// Якщо товару немає в корзині, додаємо його з кількістю 1
				state.cart.push({...product, count: 1});
			}
			
		},
		removeFromCart(state, action) {

			// Перебираємо товари і пропускаємо товар, який треба видалити
			state.cart = state.cart.filter((item) => item.id !== action.payload.id);

		},
		increaseItemCount(state, action) {
			
			// Шукаємо товар і добавляємо йому кількість
			state.cart.forEach((item) => {
				if (item.id === action.payload.id)
					item.count++;
			});
			

		},
		decreaseItemCount(state, action) {

			// Шукаємо товар і мінусуємо йому кількість
			state.cart.forEach((item) => {
				if (item.id === action.payload.id) {
					if (item.count > 1)
						item.count--;
				}
			});
			
		},
		cleanCart(state) {
			
			// Очищуємо корзину
			state.cart = [];
			
		},
		changeCartVisibility(state) {

			// Змінюємо видість корзини
			state.cartVisibility = !state.cartVisibility;
		}
	}
})

export const { addToCart, removeFromCart, increaseItemCount, decreaseItemCount, cleanCart, changeCartVisibility } = cartSlice.actions;

export default cartSlice.reducer;