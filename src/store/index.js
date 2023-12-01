import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
 } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Частина нашої корзини
import cartReducer from './cartSlice';

// Оприділили де будемо все зберігати
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'], // Дозволяти
	blacklist: [] // Блокувати
}

// Об'єднуємо всі редюсори
const rootReducer = combineReducers({
    cart: cartReducer
});

// Персістований варіант редюсорів, при кожній зміні сховища persist буде це бачити
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Оновлене сховище, яке працює з localstorage
const store = configureStore({
	reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// Обгортка сховище. Росказуємо про нашу структуру сховища
export const persistor = persistStore(store);

// Повертаємо сховище
export default store;