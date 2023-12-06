import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function CatalogHeader( { categoryId } ) {
	
    // Витягуємо дані категорій
    const { products, categories } = useSelector(state => state.catalog);

	return (
		<div className="catalog__header">
			<div className="catalog__select-category dropdown">
				<h3 className="dropdown-btn">Вибрати категорію</h3>
				<div className="dropdown-content" id="category-list">
					
				<Link to="/" className="dropdown-item">Скинути вибір</Link>
				
				{categories.map(({title, id}) => (
					<Link to={`/category/${id}`} className={`dropdown-item ${categoryId === id ? 'active' : ''}`} key={id}>{title}</Link>
				))}
					
				</div>
			</div>
			<h3 className="catalog__products-summ">Знайдено товарів: <span id="view-count-products">{products.length}</span></h3>
		</div>
	);
}

export default CatalogHeader;