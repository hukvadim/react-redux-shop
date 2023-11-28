import { getCartProducts, setCartProducts } from '../utils/utils';

// Отримуємо додані товари з localstorage
const cartAdded = getCartProducts();

// Формуємо початковий стан
const initialCartState = {
    cart: cartAdded,
    cartCount: cartAdded.length,
};

// Пишемо reducer для додавання в корзину
function cartReducer(state, action) {    
    switch (action.type) {

        // Додавання товару до корзини
        case "addToCart":
            return addToCart(state, action.product);

        // Видалення товару з корзини
        case "removeFromCart":
            return removeFromCart(state, action.productId);

        // Збільшення кількості товару в корзині
        case "increaseItemCount":
            return increaseItemCount(state, action.productId);

        // Зменшення кількості товару в корзині
        case "decreaseItemCount":
            return decreaseItemCount(state, action.productId);

        // Очищуємо корзину замолень
        case "cleanCart":
            return cleanCart(state);

        default:
            return state;
    }
}

// Базове поверення для всіх функцій
function stateObj(state, updatedCart) {
    
    // Збережіть оновлений список товарів в localStorage
    setCartProducts(updatedCart);

    return {
        ...state,
        cart: updatedCart,
        cartCount: updatedCart.length,
    };
}

// Функція для додавання товару до корзини
function addToCart(state, productToAdd) {
    const productIdToAdd = productToAdd.id;
    const productExistKey = state.cart.findIndex((item) => item.id === productIdToAdd);

    let updatedCart = [];

    if (productExistKey !== -1) {
        // Якщо товар вже є в корзині, збільшуємо кількість
        updatedCart = [...state.cart];
        updatedCart[productExistKey].count++;
    } else {
        // Якщо товару немає в корзині, додаємо його з кількістю 1
        productToAdd.count = 1;
        updatedCart = [...state.cart, productToAdd];
    }

    return stateObj(state, updatedCart)
}

// Функція для видалення товару з корзини
function removeFromCart(state, productIdToRemove) {
    const updatedCart = state.cart.filter((item) => item.id !== productIdToRemove);

    return stateObj(state, updatedCart)
}

// Функція для збільшення кількості товару в корзині
function increaseItemCount(state, productIdToIncrease) {
    const updatedCart = state.cart.map((item) => {
        if (item.id === productIdToIncrease) {
            item.count++;
        }
        return item;
    });

    return stateObj(state, updatedCart)
}

// Функція для зменшення кількості товару в корзині
function decreaseItemCount(state, productIdToDecrease) {
    const updatedCart = state.cart.map((item) => {
        if (item.id === productIdToDecrease && item.count > 1) {
            item.count--;
        }
        return item;
    });

    return stateObj(state, updatedCart)
}

// Функція для очищення корзини замовлень
function cleanCart(state) {
    return stateObj(state, []);
}

export { initialCartState, cartReducer };
