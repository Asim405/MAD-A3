const inventoryTableBody = document.getElementById('inventoryTableBody');
const searchInput = document.getElementById('searchInput');
let inventoryData = [];

function createBadge(quantity) {
  const badge = document.createElement('span');
  badge.classList.add('badge');

  if (quantity > 50) {
    badge.classList.add('green');
    badge.textContent = 'Healthy';
  } else if (quantity >= 10) {
    badge.classList.add('yellow');
    badge.textContent = 'Moderate';
  } else {
    badge.classList.add('red');
    badge.textContent = 'Low';
  }

  return badge;
}

function renderTable(rows) {
  inventoryTableBody.innerHTML = '';

  if (rows.length === 0) {
    inventoryTableBody.innerHTML = '<tr><td colspan="3" class="loading">No items match your search.</td></tr>';
    return;
  }

  rows.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.item_name}</td>
      <td>${item.quantity}</td>
      <td></td>
    `;

    const badgeCell = row.querySelector('td:last-child');
    badgeCell.appendChild(createBadge(item.quantity));
    inventoryTableBody.appendChild(row);
  });
}

function applyFilter() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = inventoryData.filter((item) =>
    item.item_name.toLowerCase().includes(query)
  );
  renderTable(filtered);
}

async function loadInventory() {
  try {
    const response = await fetch('/inventory');
    if (!response.ok) throw new Error('Network response was not ok');

    inventoryData = await response.json();
    renderTable(inventoryData);
  } catch (error) {
    inventoryTableBody.innerHTML = '<tr><td colspan="3" class="loading">Unable to load inventory.</td></tr>';
    console.error('Fetch error:', error);
  }
}

searchInput.addEventListener('input', applyFilter);
window.addEventListener('DOMContentLoaded', loadInventory);
