const ordersBody = document.getElementById('orders-body');
const totalPriceEl = document.getElementById('total-price');
const searchInput = document.getElementById('search');
let orders = [];

function formatPrice(value) {
  const amount = Number(value);
  return Number.isNaN(amount) ? '$0.00' : `$${amount.toFixed(2)}`;
}

function renderOrders(rows) {
  ordersBody.innerHTML = '';

  if (!rows.length) {
    ordersBody.innerHTML = `
      <tr>
        <td colspan="3" class="empty-state">No matching food items.</td>
      </tr>
    `;
    totalPriceEl.textContent = '$0.00';
    return;
  }

  let total = 0;

  rows.forEach((order) => {
    total += parseFloat(order.price) || 0;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.customer_name}</td>
      <td>${order.food_item}</td>
      <td>${formatPrice(order.price)}</td>
    `;
    ordersBody.appendChild(row);
  });

  totalPriceEl.textContent = formatPrice(total);
}

function filterOrders() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = orders.filter((order) =>
    order.food_item.toLowerCase().includes(query)
  );
  renderOrders(filtered);
}

async function loadOrders() {
  try {
    const response = await fetch('/orders');
    const data = await response.json();
    orders = Array.isArray(data) ? data : [];
    renderOrders(orders);
  } catch (error) {
    ordersBody.innerHTML = `
      <tr>
        <td colspan="3" class="empty-state">Unable to load orders.</td>
      </tr>
    `;
    totalPriceEl.textContent = '$0.00';
    console.error('Fetch error:', error);
  }
}

searchInput.addEventListener('input', filterOrders);
window.addEventListener('DOMContentLoaded', loadOrders);
