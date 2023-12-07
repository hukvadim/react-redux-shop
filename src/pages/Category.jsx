import { useParams } from "react-router-dom";
import Catalog from '../components/Catalog';
import apiUrl from '../api/Urls';

export default function Category() {

	// Отрмиуємо id категорії
	const { categoryId } = useParams();

	// Формуємо посилання до категорії
	const fetchUrl = apiUrl.catalogByCategory + categoryId;

	// Виводимо каталог
	return <Catalog categoryId={categoryId} fetchUrl={fetchUrl} />;
}