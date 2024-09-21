let transactions = [];
let currentLanguage = 'ru';

window.onload = function() {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
    }
    renderTransactions();

    document.getElementById('transaction-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addTransaction();
    });
};

function addTransaction() {
    const type = document.getElementById('transaction-type').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const description = document.getElementById('transaction-description').value;

    if (!amount || !description) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    const transaction = {
        type: type,
        amount: amount,
        description: description,
        date: new Date().toLocaleString()
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();

    // Очистка формы
    document.getElementById('transaction-form').reset();
}

function renderTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    let incomeTotal = 0;
    let expenseTotal = 0;

    if (transactions.length === 0) {
        transactionList.innerHTML = '<p>Нет транзакций.</p>';
        return;
    }

    transactions.forEach((transaction, index) => {
        const transactionCard = document.createElement('div');
        transactionCard.className = 'order-card';

        transactionCard.innerHTML = `
            <p><strong>${transaction.type === 'income' ? 'Доход' : 'Расход'}</strong></p>
            <p><strong>Сумма:</strong> ${transaction.amount.toLocaleString('ru-RU')} Сум</p>
            <p><strong>Описание:</strong> ${transaction.description}</p>
            <p><strong>Дата:</strong> ${transaction.date}</p>
            <button onclick="deleteTransaction(${index})" class="nav-button">Удалить</button>
        `;

        transactionList.appendChild(transactionCard);

        if (transaction.type === 'income') {
            incomeTotal += transaction.amount;
        } else {
            expenseTotal += transaction.amount;
        }
    });

    const transactionSummary = document.getElementById('transaction-summary');
    transactionSummary.innerHTML = `
        <h3>Общая информация</h3>
        <p><strong>Общий доход:</strong> ${incomeTotal.toLocaleString('ru-RU')} Сум</p>
        <p><strong>Общие расходы:</strong> ${expenseTotal.toLocaleString('ru-RU')} Сум</p>
        <p><strong>Чистая прибыль:</strong> ${(incomeTotal - expenseTotal).toLocaleString('ru-RU')} Сум</p>
    `;
}

function deleteTransaction(index) {
    if (confirm('Вы уверены, что хотите удалить эту транзакцию?')) {
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
    }
}

function logout() {
    window.location.href = 'index.html';
}
