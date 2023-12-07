import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { apiUrl} from '../api/getData';
import CatalogContent from '../components/CatalogContent';
import { selectCatalog, fetchCatalog } from '../store/catalogSlice';

const Search = () => {

	// Формуємо зверення до сховища
	const dispatch = useDispatch();

    // Витягуємо дані каталогу
    const { products, loading, error } = useSelector(selectCatalog);

	// Для роботи поля пошуку
	const [searchTimeId, setSearchTimeId] = useState(0);
		
	// Записуємо товари при завантаженні і коли виконувати пошук
	useEffect(() => {

		// Завантажуємо товари, якщо їх немає
		dispatch(fetchCatalog());

	}, [dispatch]);

	// Пошук товарів
	const setSearchProducts = useCallback((e) => {
		
		// Запам'ятовуємо пошукову фразу
		const searchQuery = e.target.value;

		// Видаляємо старі запити
		clearTimeout(searchTimeId);
		
		// Виконувати пошук по таймеру
		const timeId = setTimeout(() => {
	
			// Виводимо товари каталогу
			dispatch(fetchCatalog(apiUrl.search + searchQuery));
			
		}, 1000);
	
		// Зберігаємо id запиту
		setSearchTimeId(timeId);
	
	// Залежності при події пошуку
	}, [searchTimeId, dispatch]);
	  

	return (
		<div className="catalog" id="catalog">
			<div className="container">
				<div className="catalog__header">
					<div className="catalog__form">
						<input
							type="search"
							className="catalog__form-search"
							placeholder="Що хочете знайти?"
							onInput={setSearchProducts}
						/>
					</div>
					<h3 className="catalog__products-summ">
						Знайдено товарів: <span className="count-products">{products.length}</span>
					</h3>
				</div>
				<CatalogContent products={products} loading={loading} error={error} />
			</div>
		</div>
	);
}

export default Search;