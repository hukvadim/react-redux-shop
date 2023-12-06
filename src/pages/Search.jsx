import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { apiUrl} from '../api/getData';
import CatalogContent from '../components/CatalogContent';
import { fetchCatalog } from '../store/catalogSlice';

export default function Search() {

	// Формуємо зверення до сховища
	const dispatch = useDispatch();

    // Витягуємо дані каталогу
    const { products, loading, error } = useSelector(state => state.catalog);

	// Для роботи поля пошуку
	const [searchVal, setSearchVal] = useState('');
	const [searchTimeId, setSearchTimeId] = useState(0);
	
	// При завантаженні сторінки робимо наступне
	useEffect(() => {
		
		// Записуємо товари при завантаженні
		if(products.length === 0)
			dispatch(fetchCatalog());
	
	}, [products, dispatch]);

	// Пошук товарів
	const setSearchProducts = useCallback((e) => {
		
		// Запам'ятовуємо пошукову фразу
		const search = e.target.value;
		
		// Формуємо запит
		const url = apiUrl.search + search;

		// Записуємо пошукову фразу
		setSearchVal(search);
	  	  
		// Видаляємо старі запити
		clearTimeout(searchTimeId);
	  
		// Захист від потрачення пам'яті
		const timeId = setTimeout(() => {
			
			// Виводимо товари каталогу
			dispatch(fetchCatalog(url));

		}, 1000);
	  
		// Зберігаємо id запиту
		setSearchTimeId(timeId);
	  }, [searchTimeId, dispatch]);
	  

	return (
		<div className="catalog" id="catalog">
			<div className="container">
				<div className="catalog__header">
					<div className="catalog__form">
						<input type="text" className="catalog__form-search" placeholder="Що хочете знайти?" value={searchVal} onInput={setSearchProducts} />
					</div>
					<h3 className="catalog__products-summ">
						Знайдено товарів: &nbsp;
						<span className="count-products">
							{ loading  ? '...' : products.length }
						</span>
					</h3>
				</div>
				{
				loading 
					? <p className='no-result'>Завантаження...</p>
					: <CatalogContent products={products} loading={loading} error={error} />
				}
			</div>
		</div>
	);
  }