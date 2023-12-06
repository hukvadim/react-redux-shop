import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { apiUrl} from '../api/getData';
import CatalogHeader from './CatalogHeader';
import CatalogContent from './CatalogContent';
import { fetchCatalog, fetchCatalogCategories } from '../store/catalogSlice';

const Catalog = ({ categoryId = null }) => {
	
	// Формуємо зверення до сховища
	const dispatch = useDispatch();
	
	// Витягуємо дані каталогу
    const { categories, products, loading, error } = useSelector(state => state.catalog);

	// Дивимося чи існує категорія і формуємо відповідний url
	const fetchUrl = (categoryId) ? apiUrl.catalogByCategory + categoryId : apiUrl.catalog;

	// Загружаємо дані при завантаженні сторінки
	useEffect(() => {

		// Записуємо категорії при завантаженні
		if (categories.length === 0)
			dispatch(fetchCatalogCategories());
	
		// Записуємо товари при завантаженні
		dispatch(fetchCatalog(fetchUrl));

	// Залежності при завантаженні
	}, [fetchUrl, categories, dispatch]);


	return (
		<div className="catalog">
			<div className="container">
				<CatalogHeader categoryId={categoryId} categories={categories} products={products} />
				<CatalogContent products={products} loading={loading} error={error} />
			</div>
		</div>
	);
}

export default Catalog;