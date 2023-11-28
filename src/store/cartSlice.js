import { createSlice } from "@reduxjs/toolkit";
import { getCartProducts, setCartProducts } from '../utils/utils';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: getCartProducts()
	},
	reducers: {
		addToCart(state, action) {

			// Отримуємо id товару
			const productIdToAdd = action.payload.id;

			// Шукаємо товар для захисту від дублікату
			const productExistKey = state.cart.findIndex((item) => item.id === productIdToAdd);
			
			// Добавляємо товар до масиву або кількість в товарі, якщо він є
			if (productExistKey !== -1) {

				// Якщо товар вже є в корзині, збільшуємо кількість
				state.cart[productExistKey].count++;
			
			} else {

				// Якщо товару немає в корзині, додаємо його з кількістю 1
				action.payload.count = 1;
				state.cart.push(action.payload);
			}
			
			// Збережіть оновлений список товарів в localStorage
			setCartProducts(state.cart);

		},
		removeFromCart(state, action) {

			// Перебираємо товари і пропускаємо товар, який треба видалити
			state.cart = state.cart.filter((item) => item.id !== action.payload.id);

			// Збережіть оновлений список товарів в localStorage
			setCartProducts(state.cart);
		},
		increaseItemCount(state, action) {
			
			// Шукаємо товар і добавляємо йому кількість
			state.cart.forEach((item) => {
				if (item.id === action.payload.id) {
					item.count++;
				}
			});
			
			// Збережіть оновлений список товарів в localStorage
			setCartProducts(state.cart);

		},
		decreaseItemCount(state, action) {
			// Шукаємо товар і мінусуємо йому кількість
			state.cart.forEach((item) => {
				if (item.id === action.payload.id) {
					if (item.count > 1)
						item.count--;
				}
			});
			
			// Збережіть оновлений список товарів в localStorage
			setCartProducts(state.cart);
		},
		cleanCart(state, action) {
			
			// Очищуємо корзину
			state.cart = [];
			
			// Збережіть оновлений список товарів в localStorage
			setCartProducts(state.cart);
		}
	}
})

export const { addToCart, removeFromCart, increaseItemCount, decreaseItemCount, cleanCart } = cartSlice.actions;

export default cartSlice.reducer;