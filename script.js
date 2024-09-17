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
let total = 0;
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

    let orderList = document.getElementById('orderList');
    if (!orderList) {
        orderList = document.createElement('ul');
        orderList.id = 'orderList';
        document.body.appendChild(orderList);
    }

    const listItem = document.createElement('li');
    listItem.innerText = `${currentService.title[currentLanguage]} (${squareMeters} кв. м) - ${totalPrice} Сум.`;
    orderList.appendChild(listItem);

    total += totalPrice;

    const totalPriceElement = document.getElementById('totalPrice');
    if (!totalPriceElement) {
        const totalPriceDisplay = document.createElement('p');
        totalPriceDisplay.innerHTML = `Общая сумма заказа: <span id="totalPrice">${total}</span> Сум`;
        document.body.appendChild(totalPriceDisplay);
    } else {
        totalPriceElement.innerText = total;
    }

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
            servicePrice: total
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
