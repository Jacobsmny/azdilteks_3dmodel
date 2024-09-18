// Определение услуг
const services = {
    service1: { key: 'service1', title: { ru: 'Двор' }, description: { ru: 'Уборка двора' }, price: 15000, photo: 'photos/yard.jpg' },
    service2: { key: 'service2', title: { ru: 'Квартира' }, description: { ru: 'Уборка квартиры' }, price: 25000, photo: 'photos/apartment.jpg' },
    service3: { key: 'service3', title: { ru: 'Офис' }, description: { ru: 'Уборка офиса' }, price: 20000, photo: 'photos/office.jpg' },
    service4: { key: 'service4', title: { ru: 'Ресторан' }, description: { ru: 'Уборка ресторана' }, price: 30000, photo: 'photos/restaurant.jpg' },
    service5: { key: 'service5', title: { ru: 'Склад' }, description: { ru: 'Уборка склада' }, price: 18000, photo: 'photos/warehouse.jpg' },
    service6: { key: 'service6', title: { ru: 'Кафе' }, description: { ru: 'Уборка кафе' }, price: 22000, photo: 'photos/cafe.jpg' },
    service7: { key: 'service7', title: { ru: 'Тренажерный зал' }, description: { ru: 'Уборка тренажерного зала' }, price: 27000, photo: 'photos/gym.jpg' },
    service8: { key: 'service8', title: { ru: 'Супермаркет' }, description: { ru: 'Уборка супермаркета' }, price: 35000, photo: 'photos/supermarket.jpg' },
    service9: { key: 'service9', title: { ru: 'Авто салон' }, description: { ru: 'Уборка авто салона' }, price: 32000, photo: 'photos/carshowroom.jpg' },
    service10: { key: 'service10', title: { ru: 'Садик' }, description: { ru: 'Уборка садика' }, price: 24000, photo: 'photos/kindergarten.jpg' },
    service11: { key: 'service11', title: { ru: 'Школа' }, description: { ru: 'Уборка школы' }, price: 26000, photo: 'photos/school.jpg' },
    service12: { key: 'service12', title: { ru: 'Институт' }, description: { ru: 'Уборка института' }, price: 28000, photo: 'photos/institute.jpg' },
    service13: { key: 'service13', title: { ru: 'Учебный центр' }, description: { ru: 'Уборка учебного центра' }, price: 23000, photo: 'photos/trainingcenter.jpg' },
    service14: { key: 'service14', title: { ru: 'Дача' }, description: { ru: 'Уборка дачи' }, price: 29000, photo: 'photos/cottage.jpg' },
    service15: { key: 'service15', title: { ru: 'Бассейн' }, description: { ru: 'Уборка бассейна' }, price: 29000, photo: 'photos/pool.jpg' },
};

let currentService = null;
let orderHistory = [];
let currentLanguage = 'ru';  // Язык по умолчанию

// Функция для рендеринга услуг на главной странице
function renderServices() {
    const serviceGrid = document.querySelector('.service-grid');
    serviceGrid.innerHTML = '';

    for (let key in services) {
        const service = services[key];
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.onclick = () => openModal(service.key);

        const img = document.createElement('img');
        img.src = service.photo;
        img.alt = service.title[currentLanguage];

        const title = document.createElement('h3');
        title.innerText = service.title[currentLanguage];

        const button = document.createElement('button');
        button.innerText = 'Выбрать';
        button.onclick = (e) => {
            e.stopPropagation();
            openModal(service.key);
        };

        serviceItem.appendChild(img);
        serviceItem.appendChild(title);
        serviceItem.appendChild(button);

        serviceGrid.appendChild(serviceItem);
    }
}

// Функция открытия модального окна с услугой
function openModal(serviceKey) {
    currentService = services[serviceKey];
    document.getElementById('serviceTitle').innerText = currentService.title[currentLanguage];
    document.getElementById('serviceDescription').innerText = currentService.description[currentLanguage];
    document.getElementById('servicePrice').innerText = currentService.price.toLocaleString('ru-RU');
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
    const squareMeters = parseInt(document.getElementById('squareMeters').value);
    const totalPrice = squareMeters * currentService.price;
    document.getElementById('totalServicePrice').innerText = totalPrice.toLocaleString('ru-RU');
}

// Добавление услуги в заказ
function addToOrder() {
    const squareMeters = parseInt(document.getElementById('squareMeters').value);
    const totalPrice = squareMeters * currentService.price;

    // Открытие формы заказа с заполненными данными
    document.getElementById('orderFormModal').style.display = 'block';

    // Заполнение полей заказа данными выбранной услуги
    document.getElementById('orderService').innerText = `${currentService.title[currentLanguage]} (${squareMeters} кв. м)`;
    document.getElementById('orderTotal').innerText = `${totalPrice.toLocaleString('ru-RU')} Сум`;
}

// Открытие формы заказа
function openOrderForm() {
    document.getElementById('orderFormModal').style.display = 'block';
}

// Закрытие формы заказа
function closeOrderForm() {
    document.getElementById('orderFormModal').style.display = 'none';
    // Очистить данные заказа
    document.getElementById('orderService').innerText = '';
    document.getElementById('orderTotal').innerText = '';
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
}

// Подтверждение заказа и сохранение в историю
function confirmOrder() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const service = document.getElementById('orderService').innerText;
    const totalPriceText = document.getElementById('orderTotal').innerText;
    const totalPrice = parseInt(totalPriceText.replace(/\D/g, ''));

    if (name && phone && address && date && time) {
        const orderDetails = {
            name,
            total: totalPrice,
            address,
            date,
            time,
            service,
            timestamp: new Date().toLocaleString()
        };

        orderHistory.push(orderDetails);  // Добавляем заказ в историю
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));  // Сохраняем историю заказов в localStorage

        renderOrderHistory();  // Обновляем историю чеков после оформления заказа
        closeOrderForm();
        closeModal();
        alert('Заказ успешно оформлен!');
    } else {
        alert('Заполните все поля.');
    }
}

// Отображение истории заказов
function renderOrderHistory() {
    const orderHistoryContainer = document.getElementById('orderHistory');
    orderHistoryContainer.innerHTML = '';  // Очищаем контейнер перед добавлением новых элементов

    if (orderHistory.length === 0) {
        orderHistoryContainer.innerHTML = '<p>История заказов пуста.</p>';
        return;
    }

    orderHistory.forEach((order, index) => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <p><strong>Заказ #${index + 1}</strong></p>
            <p>Имя: ${order.name}</p>
            <p>Сумма: ${order.total.toLocaleString('ru-RU')} Сум</p>
            <p>Дата и время: ${order.timestamp}</p>
        `;
        orderCard.onclick = () => showOrderDetails(index);  // При нажатии отображаем детали заказа
        orderHistoryContainer.appendChild(orderCard);
    });
}

// Отображение деталей заказа
function showOrderDetails(index) {
    const order = orderHistory[index];
    document.getElementById('detailsName').innerText = order.name;
    document.getElementById('detailsTotal').innerText = order.total.toLocaleString('ru-RU');
    document.getElementById('detailsAddress').innerText = order.address;
    document.getElementById('detailsDate').innerText = order.date;
    document.getElementById('detailsTime').innerText = order.time;
    document.getElementById('detailsService').innerText = order.service;
    document.getElementById('detailsSquareMeters').innerText = '-'; // Не используется в текущей структуре
    document.getElementById('detailsServicePrice').innerText = '-'; // Не используется в текущей структуре
    document.getElementById('orderDetailsModal').style.display = 'block';
}

// Закрытие окна с деталями заказа
function closeOrderDetails() {
    document.getElementById('orderDetailsModal').style.display = 'none';
}

// Восстановление истории заказов при загрузке страницы
window.onload = function() {
    const savedOrderHistory = localStorage.getItem('orderHistory');
    if (savedOrderHistory) {
        orderHistory = JSON.parse(savedOrderHistory);
        renderOrderHistory();
    }
    renderServices();
};
