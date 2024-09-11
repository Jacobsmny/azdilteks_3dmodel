// Массив с информацией об услугах
const services = {
    service1: { title: 'Чистка ковров', description: 'Полная чистка ковров и мягкой мебели.', price: 1000 },
    service2: { title: 'Мойка окон', description: 'Мойка окон с использованием специальных средств.', price: 1500 },
    service3: { title: 'Уборка дома', description: 'Комплексная уборка дома.', price: 2000 },
    service4: { title: 'Полировка мебели', description: 'Полировка мебели для сохранения блеска.', price: 1200 }
};

let currentService = null; // Для хранения текущей выбранной услуги

// Функция открытия модального окна
function openModal(serviceKey) {
    currentService = services[serviceKey];
    document.getElementById('serviceTitle').innerText = currentService.title;
    document.getElementById('serviceDescription').innerText = currentService.description;
    document.getElementById('servicePrice').innerText = currentService.price;
    document.getElementById('modal').style.display = 'block';
}

// Функция закрытия модального окна
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    currentService = null;
}

// Функция добавления услуги в чек
function addToOrder() {
    if (currentService) {
        const orderList = document.getElementById('orderList');
        const listItem = document.createElement('li');
        listItem.innerText = `${currentService.title} - ${currentService.price} руб.`;
        orderList.appendChild(listItem);
        closeModal();
    }
}

// Закрытие модального окна при нажатии на кнопку "x"
document.getElementsByClassName('close')[0].addEventListener('click', closeModal);
