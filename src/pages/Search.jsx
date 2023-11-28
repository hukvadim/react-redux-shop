import React, { useState, useEffect, useCallback } from "react";
import getData, { apiUrl} from '../api/getData';
import CatalogContent from '../components/CatalogContent';

export default function Search() {

	const [searchVal, setSearchVal] = useState('');
	const [searchTimeId, setSearchTimeId] = useState(0);
	const [products, setProducts] = useState([]);
	const [productsCount, setProductsCount] = useState(0);
	const [loading, setLoading] = useState(false); 
	
	// Виводимо товари каталогу
	function viewCatalogProducts(url = apiUrl.catalog) {
		
		// Встановлюємо індикатор завантаження
		setLoading(true);
		
		// Отримуємо товари каталогу
		getData(url).then((products) => {

			// Вимикаємо індикатор завантаження
			setLoading(false);
	
			// Задаємо підрахунок товарів
			setProductsCount(products.length);
	
			// Виводимо товарів
			setProducts(products);
		})
	}

	useEffect(() => {
		
		// Виводимо товари каталогу
		viewCatalogProducts();
	
	}, []);

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
		  viewCatalogProducts(url);
		}, 1000);
	  
		// Зберігаємо id запиту
		setSearchTimeId(timeId);
	  }, [searchTimeId]);
	  

	return (
		<div className="catalog" id="catalog">
			<div className="container">
				<div className="catalog__header">
					<div className="catalog__form">
						<input type="text" className="catalog__form-search" placeholder="Що хочете знайти?" value={searchVal} onInput={setSearchProducts} />
					</div>
					{loading 
					? (
						<p>Завантаження...</p>
					) 
					: (
						<h3 className="catalog__products-summ">Знайдено товарів: <span className="count-products">{productsCount}</span></h3>
					)}
				</div>

				<CatalogContent products={products} />
			</div>
		</div>
	);
  }