// Определение услуг (включая все 15 услуг)
const services = {
    service1: {
        key: 'service1',
        title: {
            ru: 'Двор',
            uz: 'Hovli',
            en: 'Yard'
        },
        description: {
            ru: 'Уборка двора',
            uz: 'Hovlini tozalash',
            en: 'Yard cleaning'
        },
        price: 15000,
        photo: 'photos/yard.png'
    },
    service2: {
        key: 'service2',
        title: {
            ru: 'Квартира',
            uz: 'Kvartira',
            en: 'Apartment'
        },
        description: {
            ru: 'Уборка квартиры',
            uz: 'Kvartirani tozalash',
            en: 'Apartment cleaning'
        },
        price: 15000,
        photo: 'photos/apartment.png'
    },
    // Добавьте остальные услуги по аналогии...
};

let currentService = null;
let orderHistory = [];
let currentLanguage = 'ru';
let adminLoggedIn = false;

// Функция для смены языка
function changeLanguage() {
    const languageSelect = document.getElementById('language-select');
    currentLanguage = languageSelect.value;
    renderServices();
    updateTexts();
}

// Функция для обновления текста на странице при смене языка
function updateTexts() {
    // Обновите текстовые элементы в соответствии с выбранным языком
    const pricePerUnitLabel = {
        ru: 'Цена за единицу:',
        uz: 'Birlik narxi:',
        en: 'Price per unit:'
    };
    const quantityLabel = {
        ru: 'Количество (кв. м):',
        uz: 'Miqdori (kv.m):',
        en: 'Quantity (sq.m):'
    };
    const totalPriceText = {
        ru: 'Общая цена:',
        uz: 'Umumiy narx:',
        en: 'Total price:'
    };
    const addToOrderButton = {
        ru: 'Добавить в заказ',
        uz: 'Buyurtmaga qo\'shish',
        en: 'Add to order'
    };
    const orderFormTitle = {
        ru: 'Оформление заказа',
        uz: 'Buyurtma qilish',
        en: 'Place an order'
    };
    const serviceLabelText = {
        ru: 'Услуга:',
        uz: 'Xizmat:',
        en: 'Service:'
    };
    const orderTotalText = {
        ru: 'Общая сумма:',
        uz: 'Umumiy summa:',
        en: 'Total amount'
    };
    const namePlaceholder = {
        ru: 'Ваше имя',
        uz: 'Ismingiz',
        en: 'Your name'
    };
    const phonePlaceholder = {
        ru: 'Ваш телефон',
        uz: 'Telefoningiz',
        en: 'Your phone'
    };
    const addressPlaceholder = {
        ru: 'Ваш адрес',
        uz: 'Manzilingiz',
        en: 'Your address'
    };
    const confirmOrderButton = {
        ru: 'Подтвердить заказ',
        uz: 'Buyurtmani tasdiqlash',
        en: 'Confirm order'
    };
    const orderDetailsTitle = {
        ru: 'Детали заказа',
        uz: 'Buyurtma tafsilotlari',
        en: 'Order details'
    };
    const orderHistoryTitle = {
        ru: 'История заказов',
        uz: 'Buyurtmalar tarixi',
        en: 'Order history'
    };

    document.getElementById('pricePerUnitLabel').innerText = pricePerUnitLabel[currentLanguage];
    document.getElementById('quantityLabel').innerText = quantityLabel[currentLanguage];
    document.getElementById('totalPriceText').innerText = totalPriceText[currentLanguage];
    document.getElementById('addToOrderButton').innerText = addToOrderButton[currentLanguage];
    document.getElementById('orderFormTitle').innerText = orderFormTitle[currentLanguage];
    document.getElementById('serviceLabelText').innerText = serviceLabelText[currentLanguage];
    document.getElementById('orderTotalText').innerText = orderTotalText[currentLanguage];
    document.getElementById('name').placeholder = namePlaceholder[currentLanguage];
    document.getElementById('phone').placeholder = phonePlaceholder[currentLanguage];
    document.getElementById('address').placeholder = addressPlaceholder[currentLanguage];
    document.getElementById('confirmOrderButton').innerText = confirmOrderButton[currentLanguage];
    document.getElementById('orderDetailsTitle').innerText = orderDetailsTitle[currentLanguage];
    document.getElementById('orderHistoryTitle').innerText = orderHistoryTitle[currentLanguage];
}

// Функция для рендеринга услуг
function renderServices() {
    const serviceGrid = document.querySelector('.service-grid');
    serviceGrid.innerHTML = '';

    for (let key in services) {
        const service = services[key];
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';

        const img = document.createElement('img');
        img.src = service.photo;
        img.alt = service.title[currentLanguage];

        const title = document.createElement('h3');
        title.innerText = service.title[currentLanguage];

        const button = document.createElement('button');
        button.innerText = currentLanguage === 'ru' ? 'Выбрать' : currentLanguage === 'uz' ? 'Tanlash' : 'Select';
        button.onclick = () => openModal(service.key);

        serviceItem.appendChild(img);
        serviceItem.appendChild(title);
        serviceItem.appendChild(button);

        serviceGrid.appendChild(serviceItem);
    }
}

// Функции модальных окон
function openModal(serviceKey) {
    currentService = services[serviceKey];
    document.getElementById('serviceTitle').innerText = currentService.title[currentLanguage];
    document.getElementById('serviceDescription').innerText = currentService.description[currentLanguage];
    document.getElementById('servicePrice').innerText = currentService.price.toLocaleString('ru-RU');
    document.getElementById('squareMeters').value = 1;
    updateTotalPrice();
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    currentService = null;
}

function updateTotalPrice() {
    const squareMeters = parseInt(document.getElementById('squareMeters').value);
    const totalPrice = squareMeters * currentService.price;
    document.getElementById('totalServicePrice').innerText = totalPrice.toLocaleString('ru-RU');
}

function addToOrder() {
    const squareMeters = parseInt(document.getElementById('squareMeters').value);
    const totalPrice = squareMeters * currentService.price;

    document.getElementById('orderFormModal').style.display = 'block';

    document.getElementById('orderService').innerText = `${currentService.title[currentLanguage]} (${squareMeters} кв. м)`;
    document.getElementById('orderTotal').innerText = `${totalPrice.toLocaleString('ru-RU')} Сум`;
}

function closeOrderForm() {
    document.getElementById('orderFormModal').style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
}

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
            phone,
            total: totalPrice,
            address,
            date,
            time,
            service,
            timestamp: new Date().getTime(), // Используем метку времени в миллисекундах
            expirationTime: new Date().getTime() + 24 * 60 * 60 * 1000 // Время истечения через 24 часа
        };

        orderHistory.push(orderDetails);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

        renderOrderHistory();
        closeOrderForm();
        closeModal();
        alert(currentLanguage === 'ru' ? 'Заказ успешно оформлен!' : currentLanguage === 'uz' ? 'Buyurtma muvaffaqiyatli amalga oshirildi!' : 'Order placed successfully!');
    } else {
        alert(currentLanguage === 'ru' ? 'Заполните все поля.' : currentLanguage === 'uz' ? 'Barcha maydonlarni to\'ldiring.' : 'Please fill in all fields.');
    }
}

function renderOrderHistory() {
    const orderHistoryContainer = document.getElementById('orderHistory');
    orderHistoryContainer.innerHTML = '';

    const currentTime = new Date().getTime();

    // Фильтруем заказы, срок которых не истек
    orderHistory = orderHistory.filter(order => order.expirationTime > currentTime);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    if (orderHistory.length === 0) {
        orderHistoryContainer.innerHTML = `<p>${currentLanguage === 'ru' ? 'История заказов пуста.' : currentLanguage === 'uz' ? 'Buyurtmalar tarixi bo\'sh.' : 'Order history is empty.'}</p>`;
        return;
    }

    orderHistory.forEach((order, index) => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';

        orderCard.innerHTML = `
            <p><strong>${currentLanguage === 'ru' ? 'Заказ' : currentLanguage === 'uz' ? 'Buyurtma' : 'Order'} #${index + 1}</strong></p>
            <p>${currentLanguage === 'ru' ? 'Имя' : currentLanguage === 'uz' ? 'Ism' : 'Name'}: ${order.name}</p>
            <p>${currentLanguage === 'ru' ? 'Сумма' : currentLanguage === 'uz' ? 'Summa' : 'Amount'}: ${order.total.toLocaleString('ru-RU')} Сум</p>
            <p>${currentLanguage === 'ru' ? 'Дата и время' : currentLanguage === 'uz' ? 'Sana va vaqt' : 'Date and Time'}: ${new Date(order.timestamp).toLocaleString()}</p>
            <div class="countdown" id="countdown-${index}"></div>
            <button onclick="showOrderDetails(${index})">${currentLanguage === 'ru' ? 'Подробнее' : currentLanguage === 'uz' ? 'Batafsil' : 'Details'}</button>
            <button onclick="editOrder(${index})">${currentLanguage === 'ru' ? 'Редактировать' : currentLanguage === 'uz' ? 'Tahrirlash' : 'Edit'}</button>
            <button onclick="deleteOrder(${index})">${currentLanguage === 'ru' ? 'Удалить' : currentLanguage === 'uz' ? 'O\'chirish' : 'Delete'}</button>
        `;

        orderHistoryContainer.appendChild(orderCard);

        // Инициализируем таймер для каждого заказа
        initializeCountdown(order.expirationTime, `countdown-${index}`);
    });
}

// Функция для инициализации обратного отсчета
function initializeCountdown(expirationTime, elementId) {
    const countdownElement = document.getElementById(elementId);
    const totalTime = expirationTime - new Date().getTime();

    const svg = `
        <svg width="50" height="50">
            <circle cx="25" cy="25" r="25" stroke="#ccc" fill="none"></circle>
            <circle cx="25" cy="25" r="25" stroke="#007bff" fill="none" stroke-dasharray="157" stroke-dashoffset="0"></circle>
        </svg>
        <div class="countdown-text"></div>
    `;
    countdownElement.innerHTML = svg;

    const circle = countdownElement.querySelector('circle:nth-child(2)');
    const countdownText = countdownElement.querySelector('.countdown-text');

    function updateCountdown() {
        const currentTime = new Date().getTime();
        const remainingTime = expirationTime - currentTime;

        if (remainingTime <= 0) {
            renderOrderHistory();
            return;
        }

        const dashoffset = (remainingTime / totalTime) * 157;
        circle.style.strokeDashoffset = 157 - dashoffset;

        // Обновляем текст
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        countdownText.innerText = `${hours}:${minutes}:${seconds}`;

        requestAnimationFrame(updateCountdown);
    }

    updateCountdown();
}

function showOrderDetails(index) {
    const order = orderHistory[index];
    document.getElementById('detailsNameLabel').innerText = `${currentLanguage === 'ru' ? 'Имя' : currentLanguage === 'uz' ? 'Ism' : 'Name'}: ${order.name}`;
    document.getElementById('detailsTotalLabel').innerText = `${currentLanguage === 'ru' ? 'Общая сумма' : currentLanguage === 'uz' ? 'Umumiy summa' : 'Total amount'}: ${order.total.toLocaleString('ru-RU')} Сум`;
    document.getElementById('detailsAddressLabel').innerText = `${currentLanguage === 'ru' ? 'Адрес' : currentLanguage === 'uz' ? 'Manzil' : 'Address'}: ${order.address}`;
    document.getElementById('detailsDateLabel').innerText = `${currentLanguage === 'ru' ? 'Дата' : currentLanguage === 'uz' ? 'Sana' : 'Date'}: ${order.date}`;
    document.getElementById('detailsTimeLabel').innerText = `${currentLanguage === 'ru' ? 'Время' : currentLanguage === 'uz' ? 'Vaqt' : 'Time'}: ${order.time}`;
    document.getElementById('detailsServiceLabel').innerText = `${currentLanguage === 'ru' ? 'Услуга' : currentLanguage === 'uz' ? 'Xizmat' : 'Service'}: ${order.service}`;
    document.getElementById('detailsSquareMetersLabel').innerText = `${currentLanguage === 'ru' ? 'Количество' : currentLanguage === 'uz' ? 'Miqdori' : 'Quantity'}: -`;
    document.getElementById('orderDetailsModal').style.display = 'block';
}

function closeOrderDetails() {
    document.getElementById('orderDetailsModal').style.display = 'none';
}

function editOrder(index) {
    if (!adminLoggedIn) {
        const password = prompt(currentLanguage === 'ru' ? 'Введите пароль для редактирования заказа:' : currentLanguage === 'uz' ? 'Buyurtmani tahrirlash uchun parolni kiriting:' : 'Enter password to edit order:');
        if (password !== 'admin123') {
            alert(currentLanguage === 'ru' ? 'Неверный пароль' : currentLanguage === 'uz' ? 'Noto\'g\'ri parol' : 'Incorrect password');
            return;
        }
    }
    alert(currentLanguage === 'ru' ? 'Функция редактирования заказа пока не реализована.' : currentLanguage === 'uz' ? 'Buyurtmani tahrirlash funksiyasi hali amalga oshirilmagan.' : 'Order editing function is not implemented yet.');
}

function deleteOrder(index) {
    if (!adminLoggedIn) {
        const password = prompt(currentLanguage === 'ru' ? 'Введите пароль для удаления заказа:' : currentLanguage === 'uz' ? 'Buyurtmani o\'chirish uchun parolni kiriting:' : 'Enter password to delete order:');
        if (password !== 'admin123') {
            alert(currentLanguage === 'ru' ? 'Неверный пароль' : currentLanguage === 'uz' ? 'Noto\'g\'ri parol' : 'Incorrect password');
            return;
        }
    }
    if (confirm(currentLanguage === 'ru' ? 'Вы уверены, что хотите удалить этот заказ?' : currentLanguage === 'uz' ? 'Bu buyurtmani o\'chirishga ishonchingiz komilmi?' : 'Are you sure you want to delete this order?')) {
        orderHistory.splice(index, 1);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
        renderOrderHistory();
    }
}

// Функции для клиентской базы
function openClientDatabase() {
    window.location.href = 'client_database.html';
}

// Функции для бухгалтера
function openAccountant() {
    window.location.href = 'accountant.html';
}

// Функция для директора
function openAdminLogin() {
    const password = prompt(currentLanguage === 'ru' ? 'Введите пароль директора:' : currentLanguage === 'uz' ? 'Direktor parolini kiriting:' : 'Enter director\'s password:');
    if (password === 'admin123') {
        adminLoggedIn = true;
        localStorage.setItem('adminLoggedIn', true);
        alert(currentLanguage === 'ru' ? 'Вы вошли как директор.' : currentLanguage === 'uz' ? 'Siz direktor sifatida kirdingiz.' : 'You are logged in as director.');
        // Реализуйте дополнительные действия для директора
    } else {
        alert(currentLanguage === 'ru' ? 'Неверный пароль' : currentLanguage === 'uz' ? 'Noto\'g\'ri parol' : 'Incorrect password');
    }
}

// Инициализация
window.onload = function() {
    const savedOrderHistory = localStorage.getItem('orderHistory');
    if (savedOrderHistory) {
        orderHistory = JSON.parse(savedOrderHistory);
    }
    renderOrderHistory();
    renderServices();
    updateTexts();
    // Установить выбранный язык в селекте
    document.getElementById('language-select').value = currentLanguage;

    // Установить интервал для обновления истории заказов каждые 60 секунд
    setInterval(renderOrderHistory, 60000);
};
