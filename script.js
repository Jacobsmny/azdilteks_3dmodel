let services = {
    service1: { title: 'МОЙКА ЗАНАВЕЗОК ПРОСТОЙ', description: 'Моем ваши занавески на месте.', price: 15000 },
    service2: { title: 'МОЙКА ЗАНАВЕЗОК (VIP)', description: 'Полный VIP вариант.', price: 25000 },
    service3: { title: 'МОЙКА КАФЕЛЬ', description: 'Моем кафель на месте.', price: 20000 },
    service4: { title: 'МОЙКА КОВРОВ ПРОСТОЙ', description: 'Моем ковры.', price: 12000 },
    service5: { title: 'МОЙКА КОВРОВ (VIP)', description: 'VIP мойка ковров.', price: 25000 },
    service6: { title: 'УБОРКА ПРОСТОЙ', description: 'Простая уборка.', price: 45000 },
    service7: { title: 'УБОРКА ГЕНЕРАЛЬНАЯ', description: 'Генеральная уборка.', price: 65000 }
};

let currentService = null;
let total = 0;
let orderHistory = [];

// Открытие модального окна с услугой
function openModal(serviceKey) {
    currentService = services[serviceKey];
    document.getElementById('serviceTitle').innerText = currentService.title;
    document.getElementById('serviceDescription').innerText = currentService.description;
    document.getElementById('servicePrice').innerText = currentService.price;
    document.getElementById('squareMeters').value = 1;
    updateTotalPrice();
    document.getElementById('modal').style.display = 'block';
}

// Закрытие модального окна
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
    listItem.innerText = `${currentService.title} (${squareMeters} кв. м) - ${totalPrice} Сум.`;
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
        
        orderHistory.push(orderDetails); // Добавляем заказ в историю
        
        // Сохраняем историю заказов в localStorage
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
        
        renderOrderHistory();  // Обновляем историю чеков после оформления заказа
        closeOrderForm();

        // Сбрасываем общую сумму и очищаем чек
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
        orderCard.innerText = `${order.name} - ${order.total} Сум`;
        orderCard.onclick = () => showOrderDetails(index);
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
};
