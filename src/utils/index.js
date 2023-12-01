import config from './config';

// Отримуємо збережені товарів
export function getCartProducts() {
    return JSON.parse(localStorage.getItem(config.storageKey)) || [];
}

// Запам'ятовуємо масив корзини
export function setCartProducts(existingCart) {
    localStorage.setItem(config.storageKey, JSON.stringify(existingCart));
}

// Отримуємо стан корзини відкрита вона чи закрита
export function getCartVisibility() {
    return JSON.parse(localStorage.getItem(config.storageCartVisibility)) || false;
}

// Запам'ятовуємо масив корзини
export function setCartVisibility(cartVisibility) {
    localStorage.setItem(config.storageCartVisibility, JSON.stringify(cartVisibility));
}


// Заміна шаблонного тексту
export function replaceTemplate(template, data) {
    let result = template;

    // Регулярний вираз для пошуку шаблонних ключів у тексті
    const regex = /{(\w+)}/g;

    let match;
    while ((match = regex.exec(template))) {
        const [fullMatch, key] = match;
        const value = data[key];

        if (value !== undefined) {
            // Замінюємо шаблонний ключ на відповідне значення
            result = result.replace(fullMatch, value);
        }
    }

    return result;
}