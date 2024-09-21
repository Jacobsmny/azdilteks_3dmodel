let orderHistory = [];
let currentLanguage = 'ru';

window.onload = function() {
    const savedOrderHistory = localStorage.getItem('orderHistory');
    if (savedOrderHistory) {
        orderHistory = JSON.parse(savedOrderHistory);
    }
    renderClientDatabase();
};

function renderClientDatabase() {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = '';

    if (orderHistory.length === 0) {
        clientList.innerHTML = '<p>Клиентская база пуста.</p>';
        return;
    }

    orderHistory.forEach(order => {
        const clientCard = document.createElement('div');
        clientCard.className = 'order-card';

        clientCard.innerHTML = `
            <p><strong>Имя:</strong> ${order.name}</p>
            <p><strong>Телефон:</strong> ${order.phone}</p>
            <p><strong>Адрес:</strong> ${order.address}</p>
            <p><strong>Сумма заказа:</strong> ${order.total.toLocaleString('ru-RU')} Сум</p>
            <p><strong>Дата и время заказа:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
            <p><strong>Услуга:</strong> ${order.service}</p>
        `;

        clientList.appendChild(clientCard);
    });
}

function logout() {
    window.location.href = 'index.html';
}
