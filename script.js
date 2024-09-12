// Определение услуг
let services = {
    service1: { title: { en: 'Simple Curtain Cleaning', ru: 'Мойка Занавесок Простой', uz: 'Oddiy Parda Yuvish' }, description: { en: 'We clean your curtains on-site.', ru: 'Моем ваши занавески на месте.', uz: 'Biz pardalaringizni joyida yuvamiz.' }, price: 15000 },
    service2: { title: { en: 'VIP Curtain Cleaning', ru: 'Мойка Занавесок (VIP)', uz: 'VIP Parda Yuvish' }, description: { en: 'Full VIP option.', ru: 'Полный VIP вариант.', uz: 'To‘liq VIP variant.' }, price: 25000 },
    service3: { title: { en: 'Tile Cleaning', ru: 'Мойка Кафель', uz: 'Kafel Yuvish' }, description: { en: 'We clean your tiles on-site.', ru: 'Моем кафель на месте.', uz: 'Biz kafelingizni joyida yuvamiz.' }, price: 20000 },
    service4: { title: { en: 'Simple Carpet Cleaning', ru: 'Мойка Ковров Простой', uz: 'Oddiy Gilam Yuvish' }, description: { en: 'We clean carpets on-site.', ru: 'Моем ковры.', uz: 'Gilamlarni joyida yuvamiz.' }, price: 12000 },
    service5: { title: { en: 'VIP Carpet Cleaning', ru: 'Мойка Ковров (VIP)', uz: 'VIP Gilam Yuvish' }, description: { en: 'VIP carpet cleaning.', ru: 'VIP мойка ковров.', uz: 'VIP gilam yuvish.' }, price: 25000 },
    service6: { title: { en: 'Simple Cleaning', ru: 'Уборка Простой', uz: 'Oddiy Tozalash' }, description: { en: 'Simple cleaning.', ru: 'Простая уборка.', uz: 'Oddiy tozalash.' }, price: 45000 },
    service7: { title: { en: 'General Cleaning', ru: 'Уборка Генеральная', uz: 'Umumiy Tozalash' }, description: { en: 'General cleaning.', ru: 'Генеральная уборка.', uz: 'Umumiy tozalash.' }, price: 65000 }
};

let currentService = null;
let total = 0;
let orderHistory = [];
let currentLanguage = 'ru';  // Язык по умолчанию

// Функция для смены языка
function changeLanguage(lang) {
    currentLanguage = lang;
    renderServices();  // Перерисовываем услуги с новым языком
    renderOrderHistory();  // Перерисовываем историю заказов
}

// Функция открытия модального окна с услугой
function openModal(serviceKey) {
    currentService = services[serviceKey];
    document.getElementById('serviceTitle').innerText = currentService.title[currentLanguage];
    document.getElementById('serviceDescription').innerText = currentService.description[currentLanguage];
    document.getElementById('servicePrice').innerText = currentService.price;
    document.getElementById('squareMeters').value = 1;
    updateTotalPrice();
    document.getElementById('modal').style.display = 'block';
}

// Функция закрытия модального окна
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    currentService = null;
}

// Обновление цены в зависимости от количества квадратных метров
function updateTotalPrice() {
    const squareMeters = document.getElementById('squareMeters').value;
    const totalPrice = squareMeters * currentService.price;
    document.getElementById('totalServicePrice').innerText = totalPrice;
}

// Добавление услуги в заказ
function addToOrder() {
    const squareMeters = document.getElementById('squareMeters').value;
    const totalPrice = squareMeters * currentService.price;

    const orderList = document.getElementById('orderList');
    const listItem = document.createElement('li');
    listItem.innerText = `${currentService.title[currentLanguage]} (${squareMeters} кв. м) - ${totalPrice} Сум.`;
    orderList.appendChild(listItem);

    total += totalPrice;
    document.getElementById('totalPrice').innerText = total;

    closeModal();
}

// Открытие формы заказа
function openOrderForm() {
    document.getElementById('orderFormModal').style.display = 'block';
}

// Закрытие формы заказа
function closeOrderForm() {
    document.getElementById('orderFormModal').style.display = 'none';
}

// Подтверждение заказа и сохранение в историю
function confirmOrder() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (name && phone && address && date && time) {
        const orderDetails = {
            name,
            total,
            address,
            date,
            time,
            service: document.getElementById('orderList').innerText,
            squareMeters: document.getElementById('squareMeters').value,
            servicePrice: document.getElementById('totalPrice').innerText
        };

        orderHistory.push(orderDetails);  // Добавляем заказ в историю
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));  // Сохраняем историю заказов в localStorage

        renderOrderHistory();  // Обновляем историю чеков после оформления заказа
        closeOrderForm();

        total = 0;
        document.getElementById('totalPrice').innerText = '0';
        document.getElementById('orderList').innerHTML = '';  // Очищаем текущий чек
    } else {
        alert('Заполните все поля.');
    }
}

// Отображение истории заказов
function renderOrderHistory() {
    const orderHistoryContainer = document.getElementById('orderHistory');
    orderHistoryContainer.innerHTML = '';  // Очищаем контейнер перед добавлением новых элементов

    orderHistory.forEach((order, index) => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerText = `${order.name} - ${order.total} Сум`;  // Отображаем имя и общую сумму заказа
        orderCard.onclick = () => showOrderDetails(index);  // При нажатии отображаем детали заказа
        orderHistoryContainer.appendChild(orderCard);
    });
}

// Отображение деталей заказа
function showOrderDetails(index) {
    const order = orderHistory[index];
    document.getElementById('detailsName').innerText = order.name;
    document.getElementById('detailsTotal').innerText = order.total;
    document.getElementById('detailsAddress').innerText = order.address;
    document.getElementById('detailsDate').innerText = order.date;
    document.getElementById('detailsTime').innerText = order.time;
    document.getElementById('detailsService').innerText = order.service;
    document.getElementById('detailsSquareMeters').innerText = order.squareMeters;
    document.getElementById('detailsServicePrice').innerText = order.servicePrice;
    document.getElementById('orderDetailsModal').style.display = 'block';
}

// Удаление заказа
function deleteOrder(index) {
    orderHistory.splice(index, 1);  // Удаляем заказ из истории
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    renderOrderHistory();  // Обновляем отображение истории
}

// Редактирование заказа
function editOrder(index) {
    const order = orderHistory[index];
    document.getElementById('name').value = order.name;
    document.getElementById('phone').value = order.phone;
    document.getElementById('address').value = order.address;
    document.getElementById('date').value = order.date;
    document.getElementById('time').value = order.time;
    document.getElementById('orderFormModal').style.display = 'block';
}

// Закрытие окна с деталями заказа
function closeOrderDetails() {
    document.getElementById('orderDetailsModal').style.display = 'none';
}

// Восстановление истории заказов при загрузке страницы
window.onload = function() {
    const savedOrderHistory = localStorage.getItem('orderHistory');
    if (savedOrderHistory) {
        orderHistory = JSON.parse(savedOrderHistory);  // Восстанавливаем историю из localStorage
        renderOrderHistory();  // Отображаем восстановленную историю
    }
    renderServices();  // Отображаем услуги на выбранном языке
};

// Функция для отображения услуг на выбранном языке
function renderServices() {
    document.querySelectorAll('.sidebar button').forEach((button, index) => {
        const serviceKey = `service${index + 1}`;
        button.innerText = services[serviceKey].title[currentLanguage];
    });
}
