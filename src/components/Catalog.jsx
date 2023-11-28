import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getData, { apiUrl} from '../api/getData';
import CatalogHeader from './CatalogHeader';
import CatalogContent from './CatalogContent';

function Catalog({ cartState, dispatch }) {
	
	const { categoryId } = useParams();

	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [productsCount, setProductsCount] = useState(0);
	
	useEffect(() => {
		
		// Отримуємо категорії каталогу
		getData(apiUrl.category).then((category) => {
			setCategories(category);
		})

		// Дивимося чи існує категорія і формуємо відповідний url
		const url = (typeof categoryId === 'undefined') ? apiUrl.catalog : apiUrl.catalogByCategory + categoryId;
	
		// Отримуємо товари каталогу
		getData(url).then((products) => {
	
			// Задаємо підрахунок товарів
			setProductsCount(products.length);
	
			// Виводимо товарів
			setProducts(products);
		})
	
	}, [categoryId]);

	return (
		<div className="catalog">
			<div className="container">
				<CatalogHeader categories={categories} categoryId={categoryId} productsCount={productsCount} />
				<CatalogContent products={products} cartState={cartState} dispatch={dispatch} />
			</div>
		</div>
	);
}

export default Catalog;