import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { apiUrl} from '../api/getData';
import CatalogHeader from './CatalogHeader';
import CatalogContent from './CatalogContent';
import { fetchCatalog, fetchCatalogCategories } from '../store/catalogSlice';

function Catalog({ categoryId = null }) {
	
	// Формуємо зверення до сховища
	const dispatch = useDispatch();
	
	// Дивимося чи існує категорія і формуємо відповідний url
	const fetchUrl = (categoryId) ? apiUrl.catalogByCategory + categoryId : apiUrl.catalog;

	// Загружаємо дані при завантаженні сторінки
	useEffect(() => {
			
		// Записуємо категорії при завантаженні
		dispatch(fetchCatalogCategories());
	
		// Записуємо товари при завантаженні
		dispatch(fetchCatalog(fetchUrl));
	
	}, [fetchUrl, dispatch]);

	return (
		<div className="catalog">
			<div className="container">
				<CatalogHeader categoryId={categoryId} />
				<CatalogContent />
			</div>
		</div>
	);
}

export default Catalog;