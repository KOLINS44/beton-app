fetch('/orders')
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector('#orders-table tbody');
    data.forEach(order => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${order.id}</td>
        <td>${order.name}</td>
        <td>${order.phone}</td>
        <td>${order.address}</td>
        <td>${order.grade}</td>
        <td>${order.volume}</td>
        <td>${order.date}</td>
      `;
      tbody.appendChild(tr);
    });
  });
