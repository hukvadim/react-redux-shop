// Базова частина URL для API
const urlPart = 'https://6558482de93ca47020a93e41.mockapi.io/';

// Об'єкт, що містить основні URL
const urls = {
    apiCatalog : urlPart + 'catalog',
    apiCategory: urlPart + 'category',
};

// Об'єкт, який експортується як модуль та містить усі необхідні URL
const apiUrl = {
    catalog           : urlPart + 'catalog', // URL для каталогу
    catalogByCategory : urls.apiCatalog + '?catid=', // URL для фільтрації каталогу за категоріями
    category          : urlPart + 'category', // URL для категорій
    hotOffer          : urls.apiCatalog + '/?hotoffer=yes', // URL для гарячих пропозицій
    search            : urls.apiCatalog + '/?search=', // URL для пошуку в каталозі
};

export default apiUrl;
