import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import CatalogHeader from './CatalogHeader';
import CatalogContent from './CatalogContent';
import { selectCatalog, fetchCatalog, fetchCatalogCategories } from '../store/catalogSlice';

const Catalog = ({ categoryId = null, fetchUrl = null }) => {
	
	// Формуємо зверення до сховища
	const dispatch = useDispatch();
	
	// Витягуємо дані каталогу
    const { categories, products, loading, error } = useSelector(selectCatalog);

	// Загружаємо дані при завантаженні сторінки
	useEffect(() => {

		// Записуємо категорії при завантаженні
		if (categories.length === 0)
			dispatch(fetchCatalogCategories());
	
		// Записуємо товари при завантаженні
		dispatch(fetchCatalog(fetchUrl));

	// Залежності при завантаженні
	}, [categories.length, fetchUrl, dispatch]);


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