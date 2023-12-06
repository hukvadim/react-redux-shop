import { useParams } from "react-router-dom";
import Catalog from '../components/Catalog';

export default function Category() {

	// Отрмиуємо id категорії
	const { categoryId } = useParams();

	// Виводимо каталог
	return <Catalog categoryId={categoryId} />;
}