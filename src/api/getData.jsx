// Всі посилання до API
import apiUrl from "./Urls";


// Функція для отримання данних з API
export default function getData(url) {
    return fetch(url)
        .then(data => data.json())
        .catch(error => console.error("Помилка при отриманні даних:", error));
}

// Повертаємо також посилання до API
export { apiUrl };
